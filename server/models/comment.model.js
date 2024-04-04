const mongoose = require('mongoose');

// Get the types and ObjectId from mongoose
const { Types, Schema } = mongoose;
const { ObjectId } = Types;

// Define the comment schema
const commentSchema = new Schema({
    user: { type: String, required: true },
    content: { type: String, required: true },
    post: { type: ObjectId, ref: 'Post', required: true }
});

// Create the Comment model
const Comment = mongoose.model('Comment', commentSchema);

// Export the Comment model
module.exports = Comment;