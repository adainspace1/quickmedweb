// controllers/adminController.js
const User = require('../model/usermodel');
const Admin = require("../model/admin");
const Blog = require("../model/blog");
const TOPBlog = require("../model/topblog");
//const Tax = require("../model/tax");
const cloudinary = require("../cloudinary");
const multer = require('multer');
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




const handleImageUpload = (file) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'auto',
        folder: 'your_folder_name',
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary Upload Error:", error);
          reject(new Error('Error uploading image to Cloudinary: ' + error.message));
        } else {
          console.log("Cloudinary Upload Result:", result);
          resolve(result);
        }
      }
    );

    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};



// Controller for `uploadToBlog`
// Controller for `uploadToBlog`
const uploadToBlog = async (req, res) => {
  const { title, content, fullname } = req.body;
  const image1 = req.files['image1'] ? req.files['image1'][0] : null; // Access the first image
  const image2 = req.files['image2'] ? req.files['image2'][0] : null; // Access the second image
  const image3 = req.files['image3'] ? req.files['image3'][0] : null; // Access the third image

  console.log("Request Body:", req.body); // Log the request body
  console.log("Request Files:", req.files); // Log the files received by Multer

  try {
    // Validate required fields and images
    if (!title || !content || !fullname || !image1 || !image2 || !image3) {
      return res.status(400).json({ message: "All fields and all images are required." });
    }

    
    // Upload each image to Cloudinary and get their secure URLs
    const image1Url = await handleImageUpload(image1);
    const image2Url = await handleImageUpload(image2);
    const image3Url = await handleImageUpload(image3);

    console.log("Image 1 URL:", image1Url.secure_url);
    console.log("Image 2 URL:", image2Url.secure_url);
    console.log("Image 3 URL:", image3Url.secure_url);

    // Create a new blog entry with the image URLs
    const newBlog = new Blog({
      title,
      content,
      fullname,
      // images: [image1Url.secure_url, image2Url.secure_url, image3Url.secure_url], // Store only the secure URLs
      imageI: image1Url?.secure_url, 
      imageII: image2Url?.secure_url, 
      imageIII: image3Url?.secure_url
    });

    console.log("New Blog Object:", newBlog);

    // Save the blog entry to the database
    await newBlog.save();
    console.log("Blog saved successfully:", newBlog);

    // Render the admin blog page
    res.render("admin/html/blog", { user: req.session.user });
  } catch (error) {
    console.error("Error in uploadToBlog:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const Topblog = async (req, res) => {
  const { setitle, secontent, sefullname } = req.body;
  const image1 = req.files['image1'] ? req.files['image1'][0] : null;
  const image2 = req.files['image2'] ? req.files['image2'][0] : null;
  const image3 = req.files['image3'] ? req.files['image3'][0] : null;

  console.log("Request Files:", req.files); // Log the entire `req.files` object

  try {
    // Validate required fields and images
    if (!setitle || !secontent || !sefullname || !image1 || !image2 || !image3) {
      return res.status(400).json({ message: "All fields and all images are required." });
    }

    // Upload each image to Cloudinary and get their secure URLs
    const image1Url = await handleImageUpload(image1);
    const image2Url = await handleImageUpload(image2);
    const image3Url = await handleImageUpload(image3);

    console.log("Image 1 URL:", image1Url.secure_url);
    console.log("Image 2 URL:", image2Url.secure_url);
    console.log("Image 3 URL:", image3Url.secure_url);

// Ensure we only store the secure URL, not the entire response object
const newTopBlog = new TOPBlog({
  setitle,
  secontent,
  sefullname,
  // images: [
  //   image1Url?.secure_url, 
  //   image2Url?.secure_url, 
  //   image3Url?.secure_url
  // ], 
  imageI: image1Url?.secure_url, 
  imageII: image2Url?.secure_url, 
  imageIII: image3Url?.secure_url
    });

    console.log("New Top Blog Object:", newTopBlog);

    // Save the blog entry to the database
    await newTopBlog.save();
    console.log("Blog saved successfully:", newTopBlog);

    // Render the admin blog page
    res.render("admin/html/blog", { user: req.session.user });
  } catch (error) {
    console.error("Error in Topblog:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};







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
