const express = require('express');
const models = require('../models');
const fetch = require('node-fetch')

const router = express.Router();

const GOOGLE_API_KEY = 'AIzaSyDwYzFj9ZdoXVmoIV-BIopl7npSNY-h7z4';


const getRouteInfo = async (start,end) => {
    try{
        if(!start || !end) throw new Error('Empty field...');
        const response = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${start}&destination=${end}&key=${GOOGLE_API_KEY}`);
        const result = await response.json();
        if(result.status === 'OK'){
            const {distance,duration} = result.routes[0].legs[0];
            if(distance && duration){
                return {
                    ok: true,
                    distance,
                    duration
                };
            }
            throw new Error();
        }
        else throw new Error();
    }
    catch(err){
        console.log(err);
        return {
            ok: false
        }
    }
};

//Todo : Get rid of distance and cost...
router.post('/',async (req,res) => {
    const {startsAt,route,endsAt,createdBy,drivenBy} = req.body;
    try{
        if(!startsAt || !createdBy || !drivenBy || !endsAt)
            throw new Error('All fields should be set...');
        
        const person = await models.Customer.findOne({_id:createdBy,role: 'CUSTOMER'});
        if(!person) throw new Error('No such user...');

        const car = await models.Car.findOne({_id:drivenBy});
        if(!car) throw new Error('No such car... '+drivenBy);

        const [start,end] = route;
        const startLocationStr = start && (start.lat+","+start.lng);
        const endLocationStr = end && (end.lat+","+end.lng); 

        const {ok,distance,duration} = await getRouteInfo(startLocationStr,endLocationStr);
        if(!ok) throw new Error('Error fetching info from Google...');

        const order = await models.Order.create({startsAt,endsAt,distance:distance.value,duration:duration.value,cost: distance.value * 0.5,route,createdBy,drivenBy});
        
        res.json({
            ok: true,
            order
        });
    }
    catch(err){
        console.log(err);
        res.json({
            ok: false
        });
    }
});

router.delete('/', async (req,res) => {
    const {createdBy,id} = req.body;
    try {
        const order = await models.Order.findOneAndRemove({createdBy,_id: id});
        if(!order) throw new Error('No such order...');
        res.json({
            ok: true,
            order
        });
    }
    catch(err){
        res.json({
            ok: false
        });
    }
});

router.post('/carsAvailable/:id',async (req,res) => {
    const {id} = req.params;
    console.log(req.body);
    const {startTime,endTime} = req.body;
    try {
        if(!startTime || !endTime || !id) throw new Error('No time provided...');
        
        const customer = await models.Customer.find({_id:id,role: 'CUSTOMER'});
        if(!customer) throw new Error('No such customer');
 
        const ordersInInterval = await models.Order.find(
        {
            "startsAt": { "$gte": new Date(startTime) } ,
            "endsAt": { "$lt": new Date(endTime) }
        });
        
        const allCars = await models.Car.find({});
        console.log('All cars...');
        console.log(allCars);

        const cars = allCars.filter( ( {_id} ) => {
            const filtered = ordersInInterval.filter( order =>  {
                return order.drivenBy.equals(_id)
            });
            return filtered.length === 0;
        });

        res.json({
            cars,
            ok: true
        });
    }
    catch(err){
        console.log(err);
        res.json({
            ok: false
        });
    }
});


router.get('/:createdBy',async (req,res) => {
    const {createdBy} = req.params;
    try{
        if(!createdBy) throw new Error('No owner provided....');
        const orders = await models.Order.find({createdBy,status: 'ACTIVE'})
                                         .populate('drivenBy');
        if(!orders) throw new Error('No orders...');
        res.json({
            ok: true,
            orders
        });
    }
    catch(err){
        res.json({
            ok: false
        });
    }
});

router.get('/:createdBy/:id',async (req,res) => {
    const {createdBy,id} = req.params;
    try{
        if(!createdBy) throw new Error('No owner provided....');
        const order = await models.Order.findById(id)
                                         .populate('drivenBy');
        if(!order) throw new Error('No orders...');
        if(!order.createdBy.equals(createdBy)) throw new Error('Not your order...');
        res.json({
            ok: true,
            order
        });
    }
    catch(err){
        res.json({
            ok: false
        });
    }
});



module.exports = router;