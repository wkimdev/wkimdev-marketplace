var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Main Express'
  });
});

router.get('/mypage', function(req, res, next) {
  res.render('mypage');
});

/**
 * 관리자 로그인 검증 
 * @route {POST} /login
 */
router.all('/login', function(req, res) {
  res.render('login');
  // 여기서 로그인 검증 이후
  // json으로 데이터 보내고, 로그인이 완료된 화면을 보여줘야 한다. 
  // json parse 검증 코드에 넣기 

  // var _resturn = {};
  // _resturn.result = 1;
  // _resturn.resultMsg = '';
  // _resturn.resultData = req.body;
  // res.cookie("ADMIN_ID", req.body.id);
  // res.send(_resturn);
});

module.exports = router;
