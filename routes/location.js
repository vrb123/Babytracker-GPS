const express = require('express');
const models = require('../models');
const fetch = require('node-fetch')

const router = express.Router();

const GOOGLE_API_KEY = 'AIzaSyDwYzFj9ZdoXVmoIV-BIopl7npSNY-h7z4';

const googleMapsClient = require('@google/maps').createClient({
    key: GOOGLE_API_KEY,
    Promise: Promise
});  

router.post('/geocode',async (req,res) => {
    const {address} = req.body;
    try {
        if(!address) throw new Error('No address provided...');

        const response = await googleMapsClient.geocode({address,language:'ru'}).asPromise();
        console.log(response.json.results);
        res.json({
            ok: true,
            location: response.json.results[0].geometry.location
        })
    }
    catch(err){
        console.log(err);
        res.json({
            ok: false
        });
    }
});

router.post('/reversegeocode',async (req,res) => {
    const {coords} = req.body;
    try {
        if(!coords) throw new Error('No coords provided');
        const response = await googleMapsClient.reverseGeocode({latlng:coords,language:'ru'}).asPromise();
        res.json({
            ok: true,
            address: response.json.results[0].formatted_address
        })
    }
    catch(err){
        res.json({
            ok: false
        });
    }
});

router.post('/routeInfo',async (req,res) => {
    const {start,end} = req.body;
    try{
        if(!start || !end) throw new Error('Empty field...');
        const response = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${start}&destination=${end}&key=${GOOGLE_API_KEY}`);
        const result = await response.json();
        if(result.status === 'OK'){
            const {distance,duration} = result.routes[0].legs[0];
            if(distance && duration){
                res.json({
                    ok: true,
                    distance,
                    duration
                });
                return;
            }
            throw new Error();
        }
        else throw new Error();
    }
    catch(err){
        console.log(err);
        res.json( {
            ok: false
        });
    }
});



module.exports = router;