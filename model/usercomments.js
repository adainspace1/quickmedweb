const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    comments: {
        type: String,
        required: true
    },
    blogId: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog', required: true },
    fullname: {
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
   
}, {
    timestamps: true
});
module.exports = mongoose.model('Comments', userSchema);



