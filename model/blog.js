const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
       
        required: true
    },
    fullname: {
        type: String,
       
        required: true
    },
    image:{
        type:String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    
   
},
{
    timestamps: true
});

module.exports = mongoose.model('Blog', blogSchema);
