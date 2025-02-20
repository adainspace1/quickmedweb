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



// Configure Multer to use memory storage (so images are not saved locally)
const storage = multer.memoryStorage(); // Using memory storage for easier handling
const upload = multer({ storage: storage }).fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 }
]);




  


router.post('/login', logIn);
router.post('/registeradmin', registerAdmin);
router.get('/getall', getAllUsers);
router.post('/remove/:id/delete', deleteUser); 
router.get('/search', search);
router.post('/upload-blog', upload, uploadToBlog);
router.post('/blog', upload, Topblog);





router.get('/blog', (req, res)=>{
   if (!req.session.user) {
      return res.redirect('/login'); // Redirect to login if not authenticated
    }
   res.render('admin/html/blog', { user: req.session.user })
})

module.exports = router;