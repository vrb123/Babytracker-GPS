const mongoose = require('mongoose');

const TokenSchema = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Person'
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 43200
    }
});

TokenSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Token',TokenSchema);