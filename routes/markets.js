var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var dbPool = require('../util/dbPool');

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('markets', {
    //loginId: req.session.user.id
    loginId: 'bob'
  });
});

/* get market datas */
router.get('/products', function(req, res) {
  var sql = 'select id, title, price from datainfo order by id';

  dbPool.query(sql, function(err, rows) {
    if (err) {
      console.log(err);
    }
    console.log(rows);
    var result = {
      data: ''
    };
    result.data = rows;
    res.send(result);
  });

});

/* get product details */
router.all('/products/:id', function(req, res) {
  res.render('items', {
    //loginId: req.session.user.id
    loginId: 'bob',
    itemId: req.params.id
  });
});

module.exports = router;
