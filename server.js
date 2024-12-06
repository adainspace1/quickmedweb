const express = require("express");
require('dotenv').config();
const app = express();
const path = require("path")
const mongoose = require("mongoose");
const port = process.env.PORT||3800;
const authRoutes = require("./routes/userroutes")
const adminRoutes = require("./routes/adminroutes")
const bodyparser = require("body-parser")
const cors = require("cors")
const session = require("express-session")



mongoose.connect(process.env.MONGODB_CONNECTION).then(()=>{console.log("Database Connected")}).catch((err)=>{console.log(err)});


// middle ware
app.set('view engine', 'ejs');
app.use (express.static(path.join(__dirname, "assets")));//host  express static files
app.set("views", path.join(__dirname, 'views'))
app.use(cors())
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use(session({
    secret: 'Dien', // Replace with your own secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
  }));

app.use('/api/auth', authRoutes)
app.use('/api/admin', adminRoutes)






app.get('/',(req,res)=>{
    res.render('index')
});

app.get('/blog', async(req, res)=>{
    try {
        const blog = await Blog.find()
        console.log(blog)
        res.render('blog',{blog})
    } catch (error) {
        
    }
    
});

app.get('/services',(req,res)=>{
    res.render('services')
});

app.get('/contact',(req,res)=>{
    res.render('contact')
});

app.get('/Terms',(req,res)=>{
    res.render('Terms')
});

app.get('/invest/invest', (req, res) => {
    res.render('invest/invest'); // Render invest.ejs
});

app.get('/invest/investment', (req, res) => {
    res.render('invest/Investment'); // Render investment.ejs
});

app.get('/invest/partnership', (req, res) => {
    res.render('invest/partnership'); // Render partnership.ejs
});

app.get('/blogs/blog1', (req, res) => {
    res.render('blogs/blog1'); // Render invest.ejs
});


app.get('/invest/investment/404', (req, res) => {
    res.render('invest/Investment/404'); // Render investment.ejs
});

app.get('/invest/investment/200', (req, res) => {
    res.render('invest/Investment/200'); // Render investment.ejs
});


app.get('/invest/partnership/400', (req, res) => {
    res.render('invest/partnership/404'); // Render partnership.ejs
});

app.get('/invest/partnership/200', (req, res) => {
    res.render('invest/partnership/200'); // Render partnership.ejs
});

// app.get('/404',(req,res)=>{
//     res.render('404')
// });

// app.get('/200',(req,res)=>{
//     res.render('200')
// });


app.get('/admin/html/blog', (req, res) => {
    res.render('admin/html/blog'); // Render investment.ejs
});

app.get('/admin/html/adminsignin', (req, res) => {
    res.render('admin/html/adminsignin'); // Render investment.ejs
});

app.get('/about/aboutus', (req, res) => {
    res.render('about/aboutus'); // Render investment.ejs
});

app.get('/about/aboutdteam', (req, res) => {
    res.render('about/aboutdteam'); // Render partnership.ejs
});




app.get('/services/hospital', (req, res) => {
    res.render('services/hospital'); // Render partnership.ejs
});
app.get('/services/ambulance', (req, res) => {
    res.render('services/ambulance'); // Render partnership.ejs
});
app.get('/services/e-consult', (req, res) => {
    res.render('services/e-consult'); // Render partnership.ejs
});
app.get('/services/quick-call', (req, res) => {
    res.render('services/quick-call'); // Render partnership.ejs
});
app.get('/services/platform', (req, res) => {
    res.render('services/platform'); // Render partnership.ejs
});
app.get('/services/foundation', (req, res) => {
    res.render('services/foundation'); // Render partnership.ejs
});
app.get('/services/telemed', (req, res) => {
    res.render('services/telemed'); // Render partnership.ejs
});
app.get('/services/quota', (req, res) => {
    res.render('services/quota'); // Render partnership.ejs
});
app.get('/services/insurance', (req, res) => {
    res.render('services/insurance'); // Render partnership.ejs
});


app.get('/logout', (req, res)=>{
    req.session.destroy(err =>{
        if (err) {
            return res.status(500).json({status: "failed", message: err.message});
        }else{
            res.redirect('/admin/html/adminsignin')
        }
    })
})

app.listen(port,()=>{

    console.log(`Server up and running at http://localhost:${port}/`);
});