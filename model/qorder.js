const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    altphoneNumber: {
        type: String,
        required: false,
    },
    address: {
        type: String,
        required: true
    },
    info: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,

    },
    region: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    amountcost: {
        type: Number,
        required: true
    },
    month: {
        type: Number,
        required: false
    },
    monthcost: {
        type: Number,
        required: false
    },

    total: {
        type: Number,
        required: false
    },

    deliveryCost: {
        type: String,
        required: false
    },
    vat: {
        type: String,
        required: false
    },
    serviceFees: {
        type: String,
        required: false
    },
    urgencyFees: {
        type: String,
        required: false
    },
    convenienceFees: {
        type: String,
        required: false
    },
    bookingFees: {
        type: String,
        required: false
    },
    insuranceFees: {
        type: String,
        required: false
    },
}, {
    timestamps: true
});
module.exports = mongoose.model('Buy', userSchema);



