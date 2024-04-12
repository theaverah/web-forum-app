const User = require('../models/user.model.js');

exports.register = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(401).send('Invalid username or password');
        }

        const isMatch = await user.comparePassword(req.body.password);
        if (!isMatch) {
            return res.status(401).send('Invalid username or password');
        }

        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send('User not found');
        }

        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await User.update(req.params.id, req.body);
        if (!user) {
            return res.status(404).send('User not found');
        }

        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.delete(req.params.id);
        if (!user) {
            return res.status(404).send('User not found');
        }

        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
};