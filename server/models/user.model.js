const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    password: { type: String, required: true },
    bio: { type: String },
    following: { type: Number, default: 0 },
    followers: { type: Number, default: 0 },
    icon: { type: String },
});

// CRUD operations
userSchema.statics.create = async function (user) {
    const newUser = new this(user);
    return newUser.save();
};

userSchema.statics.findAll = async function () {
    return await this.find();
};

userSchema.statics.findById = async function (id) {
    return await this.findById(id);
};

userSchema.statics.update = async function (id, user) {
    return await this.findByIdAndUpdate(id, user, { new: true });
};

userSchema.statics.delete = async function (id) {
    return await this.findByIdAndDelete(id);
};

const User = mongoose.model('User', userSchema);

module.exports = User;