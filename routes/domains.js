var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('domains', {
    loginId: req.session.user.id
  });
});


/* 
 * data type 추가
 */
router.post('/addDataType', function(req, res) {
  console.log(req);
  var title = req.body.title;
  var field01 = req.body.field01;
  var field02 = req.body.field02;
  var field03 = req.body.field03;
  var field04 = req.body.field04;
  var field05 = req.body.field05;
  var provide = req.body.provider;

  // fieldnum seq 자동저장, mysql db에 저장 



});

module.exports = router;
