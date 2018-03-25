const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017', (err, db) => {
        if (err) return console.log(err);

        closure(db);
    });
};

const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

let response = {
    status: 200,
    posts: [],
    message: null
};

/* GET blog listing. */
router.get('/', (req, res) => {
    res.json(['get']);
});

/* GET a given post */
router.get('/:postId/', (req, res) => {
    res.json(['getPostID']);
});

/* POST a new post */
router.post('/', (req, res) => {
    res.json(['post']);
});

/* UPDATE a post */
router.put('/:postId/', (req, res) => {
    res.json(['put']);
});

/* DELETE a post */
router.delete('/:postId/', (req, res) => {
    res.json(['del']);
});

module.exports = router;
