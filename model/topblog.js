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
    
   
},
{
    timestamps: true
});

module.exports = mongoose.model('TOPBlog', blogSchema);
