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
    imageI:{
        type: String,
        required: false
    },
    imageII:{
        type: String,
        required: false
    },
    imageIII:{
        type: String,
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
