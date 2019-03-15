var express = require('express');
var router = express.Router();
/**
 * 관리자 로그인 검증 
 * @route {POST} /login
 */
router.all('/login', function(req, res) {
  console.log(req);
  _resturn.result = 0;
  res.send(_resturn);
});

module.exports = router;
