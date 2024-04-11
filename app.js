//npm i express express-handlebars bcrypt express-session mongoose mongodb
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const User = require('./server/models/user.model.js');
const bcrypt = require('bcrypt');
var session = require("express-session");
var morgan = require("morgan");

const db = require('./server/models/db.js');

const db = require('./server/models/db');
const Post = require('./server/models/post.model');
const app = express();

const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');

let uri = "mongodb+srv://natamendoza:010604@apdev.xlfciy3.mongodb.net/?retryWrites=true&w=majority&appName=apdev";

mongoose.connect(uri)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch(error => console.error("Error connecting to MongoDB Atlas:", error)); 

const { connectToDB } = require('./server/models/db.js');

// Configure Handlebars as the template engine
app.engine('hbs', exphbs.engine({
  defaultLayout: 'default',
  extname: 'hbs',
  layoutsDir: __dirname + '/views/layouts', 
}));

// Set the view engine to Handlebars
app.set('view engine', 'hbs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'));

// Define the main layout
app.layouts = {
  main: path.join(__dirname, 'views/layouts/default.hbs')
};

// Serve the homepage template at /
app.get('/', (req, res) => {
  res.render('homepage', {
    layout: 'default',
    title: 'Threadle',
    css: 'main.css'
  });
});

app.get('/main', (req, res) => {
  res.render('main', {
    layout: 'default',
    title: 'Threadle • About',
    css: 'main.css'
  });
})

app.get('/about', (req, res) => {
  res.render('about', {
    layout: 'default',
    title: 'Threadle • About',
    css: 'main.css'
  });
})

app.get('/homepage', (req, res) => {
  res.render('homepage', {
    layout: 'default',
    title: 'Threadle • Home',
    css: 'main.css'
  });
})

app.get('/login', (req, res) => {
  res.render('user_login', {
    layout: 'default',
    title: 'Threadle • Login',
    css: 'user_login_signup.css'
  });
});

app.get('/signup', (req, res) => {
  res.render('user_signup', {
    layout: 'default',
    title: 'Threadle • Sign up',
    css: 'user_login_signup.css'
  });
});

app.get('/profile_user', (req, res) => {
  res.render('profile_user', {
    layout: 'default',
    title: 'Threadle • User Profile',
    css: 'main.css'
  });
});

app.get('/post1', (req, res) => {
  res.render('post1', {
    layout: 'default',
    title: 'Threadle • View Post',
    css: 'main.css'
  });
});

app.post('/login_user', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log("Username:", username, "Password:", password);

  User.findOne({username: username }).lean().then(function (User) {
    console.log("Welcome", username);

    if (User != undefined && User._id != null) {
      req.session.username = username;
      console.log("Welcome again", username);
      if (User) {
        if (User.password === password) {
          res.render('homepage', {
            layout: 'default',
            title: 'Threadle • Home',
            css: 'main.css'
          });
        }
      }
    } else {
      console.log("Cannot find match");
    }
  })
});

app.get('/posts/:postId', async (req, res) => {
  try {
      const postId = req.params.postId;
      const post = await Post.findById(postId);
      if (!post) {
          return res.status(404).send('Post not found');
      }
      res.render('post1', { post });
  } catch (error) {
      console.error('Error fetching post:', error);
      res.status(500).send('Internal server error');
  }
});

app.get('/addpost', (req, res) => {
  res.render('addpost', {
    layout: 'default',
    title: 'Threadle • Add Post',
    css: 'main.css'
  });
});

app.post('/addpost', async (req, res) => {
  const { title, content, space } = req.body;

  try {
      const newPost = new Post({
          title: title,
          content: content,
          space: space,
      });

      const savedPost = await newPost.save();

      res.redirect('/homepage');
  } catch (error) {
      console.error('Error saving post:', error);
      res.status(500).send('Error saving post');
  }
});

app.get('/homepage', async (req, res) => {
  try {
      const posts = await Post.find();

      res.render('homepage', { posts: posts });
  } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).send('Internal Server Error');
  }
});


db.connectToDB();

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  console.log(`Listening at port ${PORT}`);
});
