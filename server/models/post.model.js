const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    space: { type: String, required: true },
    user: { type: String, required: true },
    date: { type: Date, default: Date.now },
    votes: { type: Number, default: 0 }
});

// Define text index on title, content, and space fields
postSchema.index({ title: 'text', content: 'text', space: 'text' });

// CRUD operations
postSchema.statics.create = async function (post) {
    const newPost = new this(post);
    return newPost.save();
};

postSchema.statics.findAll = async function () {
    return await this.find();
};

postSchema.statics.findById = async function (id) {
    return await this.findById(id);
};

postSchema.statics.update = async function (id, post) {
    return await this.findByIdAndUpdate(id, post, { new: true });
};

postSchema.statics.delete = async function (id) {
    return await this.findByIdAndDelete(id);
};

postSchema.pre('save', function(next) {
    this.user = req.user.username;
    next();
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
