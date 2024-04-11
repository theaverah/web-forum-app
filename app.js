//npm i express express-handlebars bcrypt express-session mongoose mongodb
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const User = require('./server/models/user.model.js');
const bcrypt = require('bcrypt');
var session = require("express-session");

const app = express();

const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');

let uri = "mongodb+srv://natamendoza:010604@apdev.xlfciy3.mongodb.net/?retryWrites=true&w=majority&appName=apdev";

mongoose.connect(uri)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch(error => console.error("Error connecting to MongoDB Atlas:", error));
    
app.use(session ({
  secret: 'secret_key',
  resave: false,
  saveUninitialized: false
}));

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

app.post('/signup_user', async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  console.log("Username:", username, "Password:", password);

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      // User with the provided username or email already exists
      return res.status(400).render('user_signup', { error: 'Username or email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object
    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword // Store the hashed password
      // You can include additional fields as needed
    });

    // Save the new user to the database
    await newUser.save();

    // Redirect to login page after successful signup
    res.render('homepage', {
      layout: 'default',
      title: 'Threadle • Home',
      css: 'main.css'
    });
  } catch (error) {
    console.error('Error signing up user:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Login route
app.post('/login_user', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log("Username:", username, "Password:", password);

  User.findOne({ username: username }).lean().then(function (User) {
    console.log("Welcome", User?.username);
    if (User != undefined && User._id != null) {
      req.session.username = username;
      console.log("Welcome again", User.username);

      if (User) {
        if (User.password === password) {
          res.render('homepage', {
            layout: 'default',
            title: 'Threadle • Home',
            css: 'main.css'
          });
        } else {
          console.log("username not found");
          res.render('/login', {
            layout: 'default',
            title: 'Threadle • Login',
            css: 'user_login_signup.css'
          });
        }
      }
    } else {
      console.log("Cannot find match");
    }
  })
});

// Dashboard route (protected)
app.get('/homepage', (req, res) => {
  if (!req.session.user) {
    // Redirect to login if user is not authenticated
    return res.redirect('/login');
  }

  // Render dashboard for authenticated user
  res.send(`Welcome, ${req.session.user.username}!`);
});

// Logout route
app.get('/logout', (req, res) => {
  // Destroy session data
  req.session.destroy(err => {
    if (err) {
      console.error('Error destroying session:', err);
    }
    res.redirect('/login');
  });
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  console.log(`Listening at port ${PORT}`);
});
