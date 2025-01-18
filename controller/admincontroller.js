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



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Temporary upload folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Unique file name
  },
});
const upload = multer({ storage });

// Helper function to handle image uploads
async function handleImageUpload(cameraImage, filePath) {
  try {
    if (cameraImage) {
      const result = await cloudinary.uploader.upload(cameraImage, { upload_preset: "ml_default" });
      return result.secure_url;
    } else if (filePath) {
      const result = await cloudinary.uploader.upload(filePath, { folder: "guests" });
      return result.secure_url;
    }
    throw new Error("No image provided");
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    throw new Error("Error uploading image to Cloudinary");
  }
}

// Controller for `uploadToBlog`
const uploadToBlog = async (req, res) => {
  const { title, content, fullname, cameraImage } = req.body;

  try {
    const adminId = process.env.TEST_ADMIN_ID;
    if (!adminId) {
      return res.status(500).json({ status: "failed", message: "Invalid admin" });
    }

    if (!title || !content || !fullname) {
      return res.status(400).json({
        status: "failed",
        message: "Title, content, and fullname are required.",
      });
    }

    const imageUrl = await handleImageUpload(cameraImage, req.file?.path);

    const newBlog = new Blog({ title, content, fullname, image: imageUrl });
    await newBlog.save();

    return res.render("admin/html/blog", { user: req.session.user });
  } catch (error) {
    console.error("Error in uploadToBlog:", error);
    return res.status(500).json({ status: "failed", message: "Internal server error" });
  }
};

// Controller for `Topblog`
const Topblog = async (req, res) => {
  const { setitle, secontent, sefullname, cameraImage } = req.body;

  try {
    const adminId = process.env.TEST_ADMIN_ID;
    if (!adminId) {
      return res.status(500).json({ status: "failed", message: "Invalid admin" });
    }

    if (!setitle || !secontent || !sefullname) {
      return res.status(400).json({
        status: "failed",
        message: "Title, content, and fullname are required.",
      });
    }

    const imageUrl = await handleImageUpload(cameraImage, req.file?.path);

    const newTopBlog = new TOPBlog({ setitle, secontent, sefullname, image: imageUrl });
    await newTopBlog.save();

    return res.render("admin/html/blog", { user: req.session.user });
  } catch (error) {
    console.error("Error in Topblog:", error);
    return res.status(500).json({ status: "failed", message: "Internal server error" });
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
