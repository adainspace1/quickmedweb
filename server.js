const express = require("express");
require('dotenv').config();
const app = express();
const path = require("path")
const router = express.Router();
const mongoose = require("mongoose");
const port = process.env.PORT||3800;
const authRoutes = require("./routes/userroutes")
const adminRoutes = require("./routes/adminroutes")
const bodyparser = require("body-parser")
const Blog = require("./model/blog")
const UploadBlog = require("./model/topblog")
const cors = require("cors")
const session = require("express-session")
const Comment = require("./model/usercomments");


mongoose.connect(process.env.MONGODB_CONNECTION).then(()=>{console.log("Database Connected")}).catch((err)=>{console.log(err)});
app.use(express.json()); // For parsing JSON body
app.use(session({
    secret: 'Dien', // Replace with your own secret
    resave: false,
    saveUninitialized: true,
    store: "",
    cookie: { secure: false } // Set to true if using HTTPS
  }));
// middle ware

app.use (express.static(path.join(__dirname, "assets")));//host  express static files
app.use(cors())
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, 'views'))



app.use('/api/auth', authRoutes)
app.use('/api/admin', adminRoutes)











app.get('/',(req,res)=>{
    res.render('index')
});
















// Route: Add a comment to a blog
app.post('/blogs/:id/comments', async (req, res) => {
  try {
    const {blogId,fullname, email, comments } = req.body
    const comment = new Comment({
      blogId,
      fullname,
      comments,
      email

    });
    await comment.save();
    res.redirect(`/blogs/${blogId}`)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// Route: Add a comment to a topblog
app.post('/topblogs/:id/comments', async (req, res) => {
    try {
      const {blogId,fullname, email, comments } = req.body
      const comment = new Comment({
        blogId,
        fullname,
        comments,
        email
  
      });
      await comment.save();
      res.redirect(`/topblogs/${blogId}`)
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });







 






app.get('/blogs/:userId', async (req, res) => {
    try {
        const { userId } = req.params; // Destructure userId
        console.log(userId);

        const blog = await Blog.findById(userId); // Fetch one blog by ID
        console.log(blog);

        const comments = await Comment.find({ blogId: userId }).sort({ createdAt: -1 }); // Fetch comments for this blog

        if (!blog) {
            return res.status(404).send('No blog found');
        }

        res.render('blogs/blog1', { blog, comments }); // Pass a single blog
    } catch (error) {
        console.error('Error fetching blog:', error);
        res.status(500).send('Internal Server Error');
    }
});







// Route: Fetch a specific top blog by ID
app.get('/topblogs/:topBlogId', async (req, res) => {
    try {
      const  {topBlogId}  = req.params; // Extract topBlogId from the URL
      const topBlog = await UploadBlog.findById(topBlogId); // Find top blog by ID
      console.log(topBlog)

      const topcomments = await Comment.find({ blogId: topBlogId }).sort({ createdAt: -1 }); // Fetch comments for this blog
  
      if (!topBlog) {
        return res.status(404).send('No top blog found');
      }
  
      res.render('topblogs/blog1', { topBlog, topcomments }); // Render detailed page for top blog
    } catch (err) {
      console.error('Error fetching top blog:', err.message);
      res.status(500).send('Internal Server Error');
    }
  });















app.get('/blog', async(req, res)=>{
    try {
        const blog = await Blog.find()
        const topblog = await UploadBlog.find()
        //console.log(blog)
        res.render('blog',{blog, topblog})
    } catch (error) {
        
    }
    
});



app.get('/services',(req,res)=>{
    res.render('services')
});

app.get('/contact',(req,res)=>{
    res.render('contact')
});

app.get('/success',(req,res)=>{
  res.render('success', { user: req.session.user })
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
    res.render('invest/partnership'); // RendeShare this to your stories my new ringtone   Follow @fav__lyrix for more such edits   Use #fav__lyrix  ..Tags   #musiclover #music #musically #musicinstagram #musicedits #songstatus #song #songs #songedits #songlove #desttynellyr partnership.ejs
});


app.get('/Quota/Purchase', (req, res) => {
  res.render('Quota/Purchase', {user: req.session.user}); // Render invest.ejs
});

app.get('/Quota/checkout', (req, res) => {
  res.render('Quota/checkout'); // Render invest.ejs
});

app.get('/api/auth/Quota/checkout', (req, res) => {
  res.render("Quota/checkout", {user: req.session.user})
});

// app.get('/blogs/blog1', async (req, res) => {
//     try {
//         const blogs = await Blog.find(); // Assuming BlogModel is your MongoDB model
//         res.render('blogs/blog1', { Blog: blogs }); // Pass the data to your EJS template
//     } catch (error) {
//         console.error('Error fetching blogs:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });


// app.get('/blogs/:userId', async(req, res) => {
//     try {
//         const { userId } = req.params; // Destructure userId from params
//         console.log(userId);
//         const blogs = await Blog.findById(userId);
//        console.log(blogs)
//         // Find blogs with the given userId

//         if (!blogs) {
//             return res.status(404).send('No blogs found');
//         }

//         res.render('blogs/blog1', { blogs }); // Render the blogs in the template
//     } catch (error) {
//         console.error('Error fetching blogs:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });







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