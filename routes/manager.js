const express = require('express');
const models = require('../models');

const router = express.Router();


//Todo : Get rid of distance and cost...
router.post('/',async (req,res) => {
    const {startsAt,distance,cost,route,createdBy,drivenBy} = req.body;
    try{
        if(!startsAt || !distance || !cost  || !createdBy || !drivenBy)
            throw new Error('All fields should be set...');
        
        const person = await models.Customer.findOne({_id:createdBy,role: 'MANAGER'});
        if(!person) throw new Error('No such user...');

        const driver = await models.Customer.findOne({_id:drivenBy,role:'DRIVER'});
        if(!driver) throw new Error('No such driver...');

        const order = await models.Order.create({startsAt: new Date(startsAt),distance,cost,route,createdBy,drivenBy});
        
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

router.get('/car/:id',async (req,res) => {
    const {id} = req.params;
    try{
        const manager = await models.Customer.findById(id);
        if(!manager) throw new Error('No such manager...');

        const cars = await models.Car.find({});
        if(!cars) throw new Error('No cars...');
        
        res.json({
            ok: true,
            cars
        });
    }
    catch(err){
        res.json({
            ok: false
        });
    }
});


router.post('/car/:id',async (req,res) => {
    const {id} = req.params;
    const {carNumber,owner} = req.body;
    try{
        const manager = await models.Customer.findById(id);
        if(!manager) throw new Error('No such manager...');

        const carWithTheSameNumber = await models.Car.findOne({carNumber});
        if(carWithTheSameNumber) throw new Error('Car with such number already exists');

        const driver = await models.Customer.findOne({_id:owner,role: 'DRIVER'});
        if(!driver) throw new Error('No such driver...');

        const car = await models.Car.create({carNumber,owner});
        res.json({
            ok: true,
            car
        });
    }
    catch(err){
        console.log(err);
        res.json({
            ok: false
        });
    }
});

router.get('/permissiveDrivers/:id',async (req,res) => {
    const {id} = req.params;
    try{
        const manager = await models.Customer.findById(id);
        if(!manager) throw new Error('No such manager...');

        const drivers = await models.Customer.find({role:'DRIVER'});
        if(!drivers) throw new Error('No drivers...');

        const cars = await models.Car.find({});
        if(!cars) throw new Error('No cars....');
        
        const permissiveDrivers = drivers.filter( driver => {
            const hasCarWithSuchDriver = cars.filter( car => car.owner === driver.id);
            return hasCarWithSuchDriver.length === 0;
        });

        console.log(permissiveDrivers);

        res.json({
            ok: true,
            drivers: permissiveDrivers
        });
    }
    catch(err){
        res.json({
            ok: false
        });
    }
});


router.get('/:id',async (req,res) => {
    const {id} = req.params;
    try{
        const manager = await models.Customer.findById(id);
        if(!manager) throw new Error('No such manager...');

        const orders = await models.Order.find({});
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



module.exports = router;