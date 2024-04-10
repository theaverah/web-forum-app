const mongoose = require('mongoose');

// Define the database URL to connect to.
const mongoDB = 'mongodb://127.0.0.1/ccapdev';
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

// Exporting the connectToDB function
module.exports = { connectToDB };
