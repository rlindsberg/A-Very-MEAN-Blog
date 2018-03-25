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
    connection((db) => {
        db.collection('blog')
            .find()
            .sort({created_at: -1}).toArray()
            .then((posts) => {
                response.posts = posts;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

/* GET a given post */
router.get('/:postId/', (req, res) => {
    connection((db) => {
        const id = new ObjectID(req.params.postId);

        db.collection('blog').findOne({_id: id})
            .then((post) => {
                response.posts = [post];
                res.json(response);
            })
            .catch(err => {
                sendError(err, res);
            })
    });
});

/* POST a new post */
router.post('/', (req, res) => {
    connection((db) => {
        let post = req.body;
        post.created_at = new Date();
        post.updated_at = null;
        post.comments = [];

        db.collection('blog').insert(post)
            .then((data) => {
                db.collection('blog').findOne({_id: data.insertedIds[0]})
                    .then((item) => {
                        response.posts = [item];
                        res.json(response);
                    });

            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

/* UPDATE a post */
router.put('/:postId/', (req, res) => {
    connection((db) => {
        const id = new ObjectID(req.params.postId);
        let post = req.body;
        post.updated_at = new Date();

        db.collection('blog').update({_id: id}, post)
            .then((result) => {
                db.collection('blog').findOne({_id: id})
                    .then((item) => {
                        response.posts = [item];
                        res.json(response);
                    });
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

/* DELETE a post */
router.delete('/:postId/', (req, res) => {
    connection(db => {
        const id = new ObjectID(req.params.postId);
        db.collection('blog').deleteOne({_id: id})
            .then(data => {
                res.json(response);
            })
            .catch(err => sendError(err, res));
    });
});

module.exports = router;
