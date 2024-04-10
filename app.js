const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const bcrypt = require('bcrypt');

// Configure Handlebars as the template engine
app.engine('hbs', exphbs.engine({
  defaultLayout: 'main',
  extname: 'hbs',
  layoutsDir: __dirname + '/views/layouts', 
}));

// Set the view engine to Handlebars
app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'));

// Define the main layout
app.layouts = {
  main: __dirname + '/views/layouts/main.hbs'
};

// Serve the homepage template at /
app.get('/', (req, res) => {
  res.render('user_login', {
    layout: 'default',
    title: 'Threadle • Login',
    css: 'user_login_signup.css'
  });
});

app.get('/main', (req, res) => {
  res.render('main', {
    layout: 'default',
    title: 'Threadle',
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
    layout: 'user-profile',
    title: 'Threadle • User Profile',
    css: 'main.css'
  });
});

app.post('/login', async (req, res) => {
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
    res.redirect('/user_login');
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  console.log(`Listening at port ${PORT}`);
});