const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    displayName: { type: String, required: true },
    password: { type: String, required: true },
    bio: { type: String },
    following: { type: Number, default: 0 },
    followers: { type: Number, default: 0 },
    icon: { type: String }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
