const mongoose = require('mongoose');

const PersonSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: false
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
    }
});

PersonSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Person',PersonSchema);