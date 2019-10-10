const express = require('express');
const models = require('../models');

const router = express.Router();

router.get('/',async (req,res) => {
    try{
        const cars = await models.Car.find({});
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

router.get('/:carNumber',async (req,res) => {
    const {carNumber,owner} = req.params;
    try {
        if(!carNumber || !owner) throw new Error('No car number provided...');

        const driver = await models.Customer.findOne({_id: owner, role: 'DRIVER'});
        if(!driver) throw new Error('No such driver...');
        
        const car = await models.Car.findOne({carNumber,});
        if(!car) throw new Error('No such car...');
        
        res.json({
            ok: true,
            car
        });
    }
    catch(err){
        res.json({
            ok: false
        });
    }
});


module.exports = router;