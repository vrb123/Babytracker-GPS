const mongoose = require('mongoose');

const CarSchema = mongoose.Schema({
    carNumber: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'Person',
        required: true
    },
    lat: {
        type: Number,
        default: 0
    },
    lng: {
        type: Number,
        default: 0
    }
});

CarSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Car',CarSchema);