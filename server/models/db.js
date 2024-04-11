const mongoose = require('mongoose');
const Post = require('./post.model');
const Comment = require('./comment.model');
const User = require('./user.model');

// Define the database URL to connect to.
const mongoDB = 'mongodb+srv://natamendoza:010604@apdev.xlfciy3.mongodb.net/?retryWrites=true&w=majority&appName=apdev';
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

// Connect to MongoDB
async function connectToDB() {
  try {
    await mongoose.connect(mongoDB, options);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

// Event listener for database connection error
mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

// Export the connectToDB function and the Post, Comment, and User models
module.exports = { connectToDB, Post, Comment, User };
