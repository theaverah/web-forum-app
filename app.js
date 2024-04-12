//npm i express express-handlebars bcrypt express-session mongoose mongodb
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const db = require('./server/models/db.js');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
var session = require("express-session");
var morgan = require("morgan");

const User = require('./server/models/user.model');
const Post = require('./server/models/post.model');
const Comment = require('./server/models/comment.model');

const app = express();
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');

let uri = "mongodb+srv://natamendoza:010604@apdev.xlfciy3.mongodb.net/?retryWrites=true&w=majority&appName=apdev";

mongoose.connect(uri)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch(error => console.error("Error connecting to MongoDB Atlas:", error)); 

app.use(session({
  secret: 'superdupersecretkey',
  resasve: false,
  saveUninitialized: false
}));

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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
    layout: 'user',
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

  User.findOne({username: username }).lean().then(function (User) {
    
    if (User != undefined && User._id != null) {
      req.session.username = username;
      if (User) {
        bcrypt.compare(password, User.password, function (err, resp) {
          if (resp) {
            console.log("Password matched!");
            console.log("Welcome ", username,);
            res.render('homepage', {
              layout: 'default',
              title: 'Threadle • Home',
              css: 'main.css'
            });
          }
          else{
            console.log("Passwords do not match!");
            console.log("Sign in failed.");
            return res.redirect("back")
          }
        })
      }
    } else {
      console.log("Cannot find match");
    }
  })
});

app.post('/signup_user', async (req, res) => {
  const { displayName, username, email, password } = req.body;

    let user = await User.findOne({ username });

    const takenUsername = await User.findOne({ username: username });

    // Email and Username Validation
    if (user && takenUsername) {
        console.log("Email and username already taken");
        return res.redirect("back")
    }
    if (user) {
        console.log("Email already taken");
        return res.redirect("back")
    }
    if (takenUsername) {
        console.log("Username already taken");
        console.log(takenUsername.username);
        return res.redirect("back")
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPW = await bcrypt.hash(password, salt);
    console.log(hashedPW);

    console.log("Name:", displayName, "Username: ", username, "Email:", email, "Password:", hashedPW);
    try {
      user = new User({
            username,
            displayName,
            password: hashedPW,
            email,
            bio: "The user has not added a bio yet.",
            following: "0",
            followers: "0",
            icon: "images/user-1.png"
        });
        await user.save();
        console.log("User successfully created!");
        res.render('user_login', {
          layout: 'default',
          title: 'Threadle • Login',
          css: 'user_login_signup.css'
        });
    } catch (err) {
        console.log("Unable to retrieve User", err);
        return res.redirect("back")
    }
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

// Define a route for handling search requests
app.post('/search-results', async (req, res) => {
    try {
        const query = req.body.query; // Extract the search query from the request body
        const searchResults = await Post.find({ $text: { $search: query } });

        // Render the search results page with the search results
        res.render('search-results', {
            layout: 'default',
            title: 'Search Results',
            css: 'main.css',
            results: searchResults,
            searchQuery: query
        });
    } catch (error) {
        console.error('Error performing search:', error);
        res.status(500).send('Error performing search');
    }
});


db.connectToDB();

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  console.log(`Listening at port ${PORT}`);
});
