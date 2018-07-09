var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// GET user page
router.get('/user', function(req, res, next) {
  res.send('Welcome to the user page!' );
});
module.exports = router;
