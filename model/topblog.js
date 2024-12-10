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
    seimage:{
        type:String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },
    
   
},
{
    timestamps: true
});

module.exports = mongoose.model('TOPBlog', blogSchema);
