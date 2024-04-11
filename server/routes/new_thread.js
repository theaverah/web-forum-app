const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.get('/', (req, res) => {
    res.render('newThread', {
        title: 'Create New Thread',
        profileName: req.session.profileName,
    });
});

router.post('/', async (req, res) => {
    try {
        const { title, content, space } = req.body;
        const date = new Date();
        const username = req.session.username;

        const newThread = await db.query(
            'INSERT INTO posts(title, content, space, date_created, username) VALUES($1, $2, $3, $4, $5) RETURNING *',
            [title, content, space, date, username]
        );

        res.redirect('/homepage');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;