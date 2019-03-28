var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('products');
});

router.get('/buy', function(req, res) {
  res.send('this is buy action!');
});

module.exports = router;
