const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();
const Post = require('../models/post.model.js');

// Serve the homepage template at /
router.get('/', async (req, res) => {
  try {
    // Retrieve all posts from the database
    const posts = await Post.find({});

    // Render the homepage template with the retrieved posts
    res.render('homepage', {
      layout: 'default',
      title: 'Threadle',
      css: 'main.css',
      posts: posts
    });

  } catch (error) {
    console.error('Error retrieving posts:', error);
    res.status(500).send('Error retrieving posts');
  }
});

// Serve the main template at /main
router.get('/main', (req, res) => {
  res.render('main', {
    layout: 'default',
    title: 'Threadle • Main',
    css: 'main.css'
  });
});

// Serve the about template at /about
router.get('/about', (req, res) => {
  res.render('about', {
    layout: 'default',
    title: 'Threadle • About',
    css: 'main.css'
  });
});

// Serve the homepage template at /homepage
router.get('/homepage', (req, res) => {
  res.render('homepage', {
    layout: 'default',
    title: 'Threadle • Home',
    css: 'main.css'
  });
});

router.get('/post1', (req, res) => {
  res.render('post1', {
    layout: 'default',
    title: 'Threadle • View Post',
    css: 'main.css'
  });
});

// Serve the user_login template at /user_login
router.get('/user_login', (req, res) => {
  res.render('user_login', {
    layout: 'default',
    title: 'Threadle • Login',
    css: 'user_login_signup.css'
  });
});

// Serve the user_signup template at /user_signup
router.get('/user_signup', (req, res) => {
  res.render('user_signup', {
    layout: 'default',
    title: 'Threadle • Sign up',
    css: 'user_login_signup.css'
  });
});

// Serve the profile_user template at /profile_user
router.get('/profile_user', (req, res) => {
  res.render('profile_user', {
    layout: 'default',
    title: 'Threadle • User Profile',
    css: 'main.css'
  });
});

router.post('/user_login_signup', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
    });
    await newUser.save();

    console.log('New user created:', newUser);

    res.redirect('/user-profile');

  } catch {
    res.redirect('/user_login_signup');
  }
});

module.exports = router;