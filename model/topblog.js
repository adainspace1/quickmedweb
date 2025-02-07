const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    setitle: {
        type: String,
        required: true
    },
    secontent: {
        type: String,
       
        required: true
    },
    sefullname: {
        type: String,
       
        required: true
    },
    image:{
        type:String,
        required: true
    },
    
   
},
{
    timestamps: true
});

module.exports = mongoose.model('TOPBlog', blogSchema);
