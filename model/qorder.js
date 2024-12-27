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
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    info: {
        type: String,
        required: true
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
        required: true
    },
    vat: {
        type: String,
        required: true
    },
    serviceFees: {
        type: String,
        required: true
    },
    urgencyFees: {
        type: String,
        required: true
    },
    convenienceFees: {
        type: String,
        required: true
    },
    bookingFees: {
        type: String,
        required: true
    },
    insuranceFees: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});
module.exports = mongoose.model('Buy', userSchema);



