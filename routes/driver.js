const express = require('express');
const models = require('../models');

const router = express.Router();

router.post('/location',async (req,res) => {
    const {lng,lat,owner} = req.body;
    try{
        if( !lng || !lat || !owner ) throw new Error('No location provided...');
        const carToUpdate = await models.Car.findOneAndUpdate({owner},{
            lng,
            lat
        },
        {
            new: true
        });
        if(!carToUpdate) throw new Error('Wrong credentials...');
        res.json({
            ok: true,
            car: carToUpdate
        });
    }
    catch(err){
        res.json({
            ok: false
        });
    }
});

router.patch('/closeOrder',async (req,res) => {
    const {owner,destination,orderId} = req.body;
    try{
        if(!owner || !destination) throw new Error('Include your location...');
        const order = await models.Order.findById(orderId);
        if(!order) throw new Error('An error occured');
        const carOwner = await models.Car.findOne({owner});
        if(!carOwner) throw new Error('No such owner');
        if(carOwner._id !== order.drivenBy) throw new Error('Cars doesnt match');
        if( Date.parse(order.startsAt) > new Date() ) throw new Error('Cannot close the order before start...');
        order.status = 'ENDED';
        order.destination = destination;
        order.endTime = new Date();
        await order.save();
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

router.get('/:owner',async (req,res) => {
    const {owner} = req.params;
    try{
        if(!owner) throw new Error('No owner provided....');
        const orders = await models.Order.find({owner,status: 'ACTIVE'});
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