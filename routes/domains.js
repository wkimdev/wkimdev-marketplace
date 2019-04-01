var express = require('express');
var router = express.Router();
var camelcaseKeys = require('camelcase-keys');
var dbTestDb = require('../model/dbTest');
var dbPool = require('../util/dbPool');
var mysql = require('mysql');
// dbPool.connect();

var connection = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'market'
});

//connection.connect();
connection.getConnection();


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
  connection.query(sql, function(err, rows) {
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
 * data type 추가
 */
router.post('/addDataType', function(req, res) {
  // console.log(req);
  var title = req.body.title;
  var field01 = req.body.field01;
  var field02 = req.body.field02;
  var field03 = req.body.field03;
  var field04 = req.body.field04;
  var field05 = req.body.field05;
  var provider = req.body.provider;

  //var sql = " insert into datatype (title, field01, field02, field03, field04, field05, provider, adddate) " +
  // " values (?, ?, ?, ?, ?, ?, ?, ?) ";
  // " values ('test5', '11', '22', '33', '44', '55', 'bob', now()); ";

  // var sql = " INSERT INTO datatype SET ? ";
  // var params = {
  //   title: 'test5',
  //   field01: '11',
  //   field02: '22',
  //   field03: '33',
  //   field04: '44',
  //   field05: '55',
  //   provider: 'bob',
  //   adddate: NOW()
  // };
  //[title, field01, field02, field03, field04, field05, provider, now()],

  var post = {
    title: 'test6',
    field01: '1',
    field02: '2',
    field03: '3',
    field04: '4',
    field05: '5',
    adddate: now()
  };
  var query = connection.query(
    ' INSERT INTO datatype SET ? ',
    post,
    function(err, rows) {
      console.log(err);
      console.log(rows);
      // if (err) {
      //   console.log(err);
      // } else {
      //   console.log(rows.insertId);
      // }
    });
  console.log("sql :" + query);
});

module.exports = router;
