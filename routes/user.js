var express = require('express');
var router = express.Router();


// /user 호출 시 build 된 user.html을 화면에서 볼 수 있게 합니다.
router.all('/user', function index(req, res) {
  res.sendFile(path.join(__dirname, '../dist', 'user.html'))
})


module.exports = router;
