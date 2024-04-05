const mongoose = require('mongoose');
const User = require('./user.model');
const Post = require('./post.model');
const Comment = require('./comment.model');

// Connect to MongoDB with a callback function
mongoose.connect('mongodb://localhost:27017/ccapdev', { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
    if (error) {
        console.error('Error connecting to MongoDB:', error);
        return;
    }

// Import sample data from JSON files
    async function seedDatabase() {
        try {
            await User.deleteMany(); // Clear existing users
            await Post.deleteMany(); // Clear existing posts
            await Comment.deleteMany(); // Clear existing comments

            const users = require('user.json'); // Import sample users
            const posts = require('posts.json'); // Import sample posts
            const comments = require('comments.json'); // Import sample comments

            const createdUsers = await User.create(users); // Insert sample users
            const createdPosts = await Post.create(posts); // Insert sample posts
            const createdComments = await Comment.create(comments); // Insert sample comments

            console.log('Sample data seeded successfully:', createdUsers, createdPosts, createdComments);
        } catch (error) {
            console.error('Error seeding database:', error);
        } finally {
            // Close the MongoDB connection after seeding
            mongoose.connection.close();
        }
    }
    seedDatabase();}