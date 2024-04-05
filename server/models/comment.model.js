const mongoose = require('mongoose');

// Get the types and ObjectId from mongoose
const { Types, Schema } = mongoose;
const { ObjectId } = Types;

// Define the comment schema
const commentSchema = new Schema({
    user: { type: String, required: true },
    content: { type: String, required: true },
    post: { type: ObjectId, ref: 'Post', required: true },
    createdAt: { type: Date, default: Date.now },
});

// CRUD operations
commentSchema.statics.create = async function (comment) {
    const newComment = new this(comment);
    return newComment.save();
};

commentSchema.statics.findAll = async function () {
    return await this.find();
};

commentSchema.statics.findById = async function (id) {
    return await this.findById(id);
};

commentSchema.statics.update = async function (id, comment) {
    return await this.findByIdAndUpdate(id, comment, { new: true });
};

commentSchema.statics.delete = async function (id) {
    return await this.findByIdAndDelete(id);
};

// Create the Comment model
const Comment = mongoose.model('Comment', commentSchema);

// Export the Comment model
module.exports = Comment;