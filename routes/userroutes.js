const express = require('express');
const router = express.Router();
const 
{
  invest,
  partnership,
  comments,
  order

   
} = require("../controller/usercontroller")
const multer = require('multer');

// Multer configuration for handling file uploads

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Temporary upload folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique file name
  },
});
const upload = multer({ storage });


router.get("/invest/investment", (req, res)=>{
    res.render('invest/investment')
})

router.get("/invest/partnership", (req, res)=>{
  res.render('invest/partnership')
})

router.post('/blogs/blog1', comments);
router.post('/invest/investment', invest);
router.post('/invest/partnership', partnership);
router.post('/Quota/checkout', order )

module.exports = router