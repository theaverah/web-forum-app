fetch('server/models/posts.json')
    .then(response => response.json())
    .then(data => {
        const context = { posts: data };
        const htmlOutput = template(context);
        document.getElementById('content').innerHTML = htmlOutput;
    });

const templateSource = document.getElementById('home-template').innerHTML;
const template = Handlebars.compile(templateSource);

function template(context) {
    return template(context);
}

const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.get('/', async (req, res) => {
    try {
        const posts = await db.query('SELECT * FROM posts ORDER BY date_created DESC');
        res.render('homepage', {
            title: 'Threadle',
            profileName: req.session.profileName,
            posts: posts.rows,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;