var express = require('express');
var router = express.Router();

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

module.exports = router;
