const mongoose = require('mongoose');

const PersonSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum : ['CUSTOMER','MANAGER','DRIVER'],
        default: 'CUSTOMER'
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    },
    isVerified: {
        type: Boolean,
        default: false,
    }
});

PersonSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Person',PersonSchema);