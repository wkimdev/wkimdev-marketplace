var express = require('express');
var router = express.Router();
var dbPool = require('../util/dbPool');

/* GET users listing. */
router.get('/', function(req, res) {
  // 세션에 login아이디가 없으면 로그인 하라는 alert를 보여줘야 한다. --> 안그러면 error 
  res.render('products', {
    //loginId: req.session.user.id
    loginId: 'bob'
  });
});

router.get('/buy', function(req, res) {
  res.send('this is buy action!');
});

router.post('/addData', function(req, res){
  var title = req.body.title;
  var field01 = req.body.field01;
  var field02 = req.body.field02;
  var field03 = req.body.field03;
  var field04 = req.body.field04;
  var field05 = req.body.field05;
  var provider = req.body.provider;

  var sql = " INSERT INTO datainfo SET ? ";
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
})

module.exports = router;
