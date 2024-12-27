const express = require('express');
const router = express.Router();
const 
{
  invest,
  partnership,
  comments,
  order

   
} = require("../controller/usercontroller")



router.get("/invest/investment", (req, res)=>{
    res.render('invest/investment')
})

router.get("/invest/partnership", (req, res)=>{
  res.render('invest/partnership')
})

router.post('/blogs/blog1', comments);
router.post('/invest/investment', invest);
router.post('/invest/partnership', partnership);
router.post('/Quota/checkout', order)

module.exports = router