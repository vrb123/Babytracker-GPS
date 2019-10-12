const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now,
    },
    startsAt:{
        type: Date,
        required: true,
    },
    endsAt: {
        type: Date,
        required: true
    },
    endTimeConfirmed:{
        type: Date,
    },

    distance: {
        type: Number,
        required: true,
    },
    cost: {
        type: Number,
        required: true
    },
    route: [{
        lat: Number,
        lng: Number
    }],
    carType: {
        type: String,
        enum: ['sedan','bus','suv'],
        required: true
    },

    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'Person',
        required: true
    },
    drivenBy: {
        type: mongoose.Types.ObjectId,
        ref: 'Car',
        required: true
    },
    
    status: {
        type: String,
        enum : ['ACTIVE','ENDED'],
        default: 'ACTIVE'
    },
    destination: {
        lat: Number,
        lng: Number
    },
    
});

OrderSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Order',OrderSchema);