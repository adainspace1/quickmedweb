//my express server imports
const express = require('express');
const router = express.Router();
const multer = require("multer")
const app = express();
//all my controller imports 
const 
{
  
   deleteUser,
   logIn,
   search,
   registerAdmin,
   getAllUsers,
   uploadToBlog,
   Topblog

} 
= require("../controller/admincontroller");



 const upload = multer();

 app.post('/upload', upload.single('image')), (req, res) => {
   try {
     // Access the uploaded files
     const imageFile = req.files['image'] ? req.files['image'][0] : null;
    //  const seImageFile = req.files['seimage'] ? req.files['seimage'][0] : null;
 
     if (!imageFile) {
       return res.status(400).json({ message: 'Both image and seimage are required.' });
     }
 
     res.status(200).json({
       message: 'Files uploaded successfully!',
       image: imageFile.filename,
     });
   } catch (err) {
     console.error(err);
     res.status(500).json({ message: 'File upload failed.', error: err.message });
   }
  
  }
  


router.post('/login', logIn);
router.post('/registeradmin', registerAdmin);
router.get('/getall', getAllUsers);
router.post('/remove/:id/delete', deleteUser); 
router.get('/search', search);
router.post('/upload-blog', upload.single('image'), uploadToBlog);
router.post('/blog', upload.single('image'), Topblog);





router.get('/blog', (req, res)=>{
   if (!req.session.user) {
      return res.redirect('/login'); // Redirect to login if not authenticated
    }
   res.render('admin/html/blog', { user: req.session.user })
})

module.exports = router;