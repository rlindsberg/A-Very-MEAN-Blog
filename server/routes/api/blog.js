const express = require('express');
const router = express.Router();


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
