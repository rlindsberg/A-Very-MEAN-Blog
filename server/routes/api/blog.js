const express = require('express');
const router = express.Router();

let responseJSON = {
    'posts': []
};

/* GET blog listing. */
router.get('/', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(responseJSON));
});

module.exports = router;
