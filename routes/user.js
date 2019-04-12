var express = require('express');
var router = express.Router();
var dbPool = require('../util/dbPool');

// /user 호출 시 build 된 user.html을 화면에서 볼 수 있게 합니다.
// router.all('/user', function index(req, res) {
//   res.sendFile(path.join(__dirname, '../dist', 'user.html'))
// })

/** get my upload list */
router.post('/myUploadList', function(req, res) {
  var buyUser = req.body.buyUser;

  var sql = " SELECT di.id as dataId, dt.title, di.adddate, di.price, di.traded, di.buyDate, di.buyUser " +
    "  FROM datainfo di " +
    "  JOIN datatype dt " +
    "    ON di.datatypeid = dt.id " +
    " WHERE di.provider = ? ";

  dbPool.query(sql, buyUser, function(err, rows) {
    if (err) {
      console.log(err);
    }
    var result = {
      data: ''
    };
    result.data = rows;
    res.send(result);
  });

});

/** get my traded list */
router.post('/myTradedList', function(req, res) {
  var buyUser = req.body.buyUser;

  var sql = " SELECT di.id as dataId, dt.title, di.adddate, di.price, di.traded, di.buyDate, di.buyUser, di.provider " +
    "  FROM datainfo di " +
    "  JOIN datatype dt " +
    "    ON di.datatypeid = dt.id " +
    " WHERE di.buyUser = ? ";

  dbPool.query(sql, buyUser, function(err, rows) {
    if (err) {
      console.log(err);
    }
    var result = {
      data: ''
    };
    result.data = rows;
    res.send(result);
  });

});

module.exports = router;
