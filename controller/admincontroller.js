// controllers/adminController.js
const User = require('../model/usermodel');
const Admin = require("../model/admin");
const Blog = require("../model/blog");
const TOPBlog = require("../model/topblog");
//const Tax = require("../model/tax");
const cloudinary = require("../cloudinary");
const streamifier  = require("streamifier");

require("dotenv").config();





// Login an admin
const logIn = async (req, res) => {
  try {
      const { email, password } = req.body;

      // Find the admin
      const admin = await Admin.findOne({ email });
      if (!admin) {
          return res.status(400).json({ message: 'Invalid email or password' });
      }

      // Compare passwords
      // const isMatch = await admin.comparePassword(password);
      // if (!isMatch) {
      //     return res.status(400).json({ message: 'Invalid email or password' });
      // }


      req.session.user = {
        id: admin._id,
        email: admin.email
       
      };
      // Generate a token

      // Send success response with token
      res.status(200).json({
        status: "Success",
        message: "Login successful",
        user: {
            id: admin._id,
            email: admin.email
            // Add other admin fields as needed
        }
    });
  } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Register a new admin
const registerAdmin = async (req, res) => {
  try {
      const { fullname, email, password, isAdmin } = req.body;

      // Check if admin already exists
      const existingAdmin = await Admin.findOne({ email });
      if (existingAdmin) {
          return res.status(400).json({ message: 'Admin already exists' });
      }

      // Create a new admin
      const newAdmin = new Admin({ fullname, email, password, isAdmin });
      await newAdmin.save();

      // Generate a token

      res.status(201).json({ admin: newAdmin });
  } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
  }
};


const getAllUsers = async (req, res) => {
  try {


    //console.log(transac)

            // Check if session exists
      if (!req.session.user) {
              // Session does not exist, redirect to login or show an error
              return res.redirect('/adminlogin'); 
      }

      const users = await User.find();
      // const transac = await Tax.find();
      // const subscribe = await Tax.find();

      //    // Calculate total amount
      //    const totalAmount = subscribe.reduce((sum, user) => sum + user.amount, 0);
      

  
  
// console.log(subscribe)
    res.render('admin/html/blog', { users, user: req.session.user}); // Rendering a view with the users data
  } catch (err) {
    res.status(500).send('Error retrieving users');
  }
};



const uploadToBlog = async(req, res)=>{
  const { title, content, fullname } = req.body;

  try{
    const adminId = process.env.TEST_ADMIN_ID;
    if(!adminId){
      res.status(500).json({status:"failed", message: "invalid admin"})

    }else{
        if(!title || !content || !fullname){
          return res.status(400).json({status: "failed", message: 'Title, content, and image are required.' });
        }
// Get the image URL from Cloudinary
       const imageUrl = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
         // If an image file is provided
      if (req.file) {
        // Wrap the Cloudinary upload in a promise
       
          const uploadStream = cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
            if (error) {
                return res.status(500).send('Error uploading image to Cloudinary');
            }
            imageUrl = result.secure_url;
            
        
            createuser()
          

          });
          
          streamifier.createReadStream(req.file.buffer).pipe(uploadStream);        
      }else{
        createuser()
      }

      async function createuser(){

            // Get the image URL from Cloudinary
           //const imageUrl = req.file.path;
            // Create and save the blog post
            const newBlog = new Blog({
              title,
              content,
              fullname,
              image: imageUrl, // Save Cloudinary URL in the database
          });
    
          await newBlog.save();
          return res.render('admin/html/blog', {user:req.session.user})
        //   return res.status(201).json({
        //     message: 'Blog post created successfully!',
        //     blog: newBlog,
        // });
        }

      }

       

  }catch(error){
    console.error('Error uploading blog post:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }

}



const Topblog = async(req, res)=>{
  const { setitle, secontent, sefullname } = req.body;
  console.log(setitle, secontent, sefullname)

  try{
    const adminId = process.env.TEST_ADMIN_ID;
    if(!adminId){
      res.status(500).json({status:"failed", message: "invalid admin"})

    }else{
        if(!setitle || !secontent || !sefullname){
          return res.status(400).json({status: "failed", message: 'Title, content, and image are required.' });
        }
// Get the image URL from Cloudinary
       const imageUrl = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
         // If an image file is provided
      if (req.file) {
        // Wrap the Cloudinary upload in a promise
       
          const uploadStream = cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
            if (error) {
                return res.status(500).send('Error uploading image to Cloudinary');
            }
            imageUrl = result.secure_url;
            
        
            createuser()
          

          });
          
          streamifier.createReadStream(req.file.buffer).pipe(uploadStream);        
      }else{
        createuser()
      }

      async function createuser(){

            // Get the image URL from Cloudinary
           //const imageUrl = req.file.path;
            // Create and save the blog post
            const blog = new TOPBlog({
              setitle,
              secontent,
              sefullname,
              seimage: imageUrl, // Save Cloudinary URL in the database
          });
    
          await blog.save();
          console.log(blog)
          return res.render('admin/html/blog', {user:req.session.user})
        //   return res.status(201).json({
        //     message: 'Blog post created successfully!',
        //     blog: newBlog,
        // });
        }

      }

       

  }catch(error){
    console.error('Error uploading blog post:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }

}



const deleteUser = async (req, res) => {
    try {
      const userId = req.params.id; // Get user ID from request parameters
      await User.findByIdAndDelete(userId); // Delete user by ID
      res.redirect('/adminlogin'); // Redirect to users list after deletion
    } catch (err) {
      res.status(500).send('Error deleting user');
    }
  };

const search = async (req, res) => {
    const criteria = req.query;
    const query = {};

    if (criteria.email) {
        query.email = { $regex: new RegExp(criteria.email, 'i') }; // Correct regex usage
    }

    try {
        const user = await User.find(query);
        console.log(user)
        
        res.render("admin/html/search",{result: user});
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while searching for jobs.' });
    }
};



module.exports = {

  deleteUser, 
  logIn, 
  search, 
  registerAdmin, 
getAllUsers,
uploadToBlog,
Topblog

};
