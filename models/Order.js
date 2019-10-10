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
    endTimeConfirmed:{
        type: Date,
    },
    endsAt: {
        type: Date,
        required: true
    }
});

OrderSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Order',OrderSchema);