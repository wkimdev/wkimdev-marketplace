var express = require('express');
var router = express.Router();
var dbTestDb = require('../model/dbTest');
var dbPool = require('../util/dbPool');

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('domains', {
    //loginId: req.session.user.id
    loginId: 'bob'
  });
});

/* GET datatype list */
router.get('/getDataTypeList', function(req, res) {
  var sql = " SELECT * FROM datatype ";
  dbPool.query(sql, function(err, rows) {
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

/* 
 * get datatype filed
 */
router.get('/getDataTypeField', function(req, res){
  console.log(req.query.datatype);
  var param = req.query.datatype;
  var sql = 'select id, field01, field02, field03, field04, field05  from datatype where title = ?';

  dbPool.query(sql, param, function(err, rows){
    if (err) {
      console.log(err);
    }
    var result = {
      data: ''
    };
    result.data = rows;
    res.send(result);
  })
})

/* 
 * data type 추가
 */
router.post('/addDataType', function(req, res) {
  var title = req.body.title;
  var field01 = req.body.field01;
  var field02 = req.body.field02;
  var field03 = req.body.field03;
  var field04 = req.body.field04;
  var field05 = req.body.field05;
  var provider = req.body.provider;

  var sql = " INSERT INTO datatype SET ? ";
  var params = {
    title: title,
    field01: field01,
    field02: field02,
    field03: field03,
    field04: field04,
    field05: field05,
    provider: provider,
    adddate: new Date()
  };

  dbPool.query(
    sql,
    params,
    function(err, results) {
      if (err) {
        console.log(err);
      }
      console.log(results);
      res.json(results);
    });
});


module.exports = router;
