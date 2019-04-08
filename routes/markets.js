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
  var sql = 'select di.id, dt.title, di.price' +
    ' from datainfo di ' +
    ' join datatype dt on di.datatypeid = dt.id';

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

module.exports = router;
