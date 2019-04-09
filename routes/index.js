var express = require('express');
var path = require('path');
var router = express.Router();


// router.get('/test', function(req, res, next) {
//   res.sendFile(path.join(__dirname, '../public', 'index.html'));
// });

/* GET home page. */
router.get('/', function(req, res) {
  if (req.session.user) {
    console.log("session exist!");
    res.render('index', {
      loginId: req.session.user.id,
      loginPw: req.session.user.pw
    });
  } else {
    console.log("session not exist!");
    res.render('login');
  }
});

/** test page */
router.get('/test', function(req, res) {
  res.render('fileupload');
})

router.get('/mypage', function(req, res, next) {
  res.render('mypage', {
    //loginId: req.session.user.id,
    loginId: "bob",
    //loginPw: req.session.user.pw
  });
});

/**
 * 관리자 로그인 검증 
 * @route {POST} /login
 */
router.post('/login', function(req, res) {
  var loginId = req.body.loginId;
  var loginPw = req.body.loginPw;

  console.log(loginId + " " + loginPw);
  if (req.session.user) {
    console.log("session is not empty");
    res.render('index', {
      loginId: req.session.user.id,
      loginPw: req.session.user.pw
    });
  } else {
    console.log("session is empty, now saved");
    req.session.user = {
      id: loginId,
      pw: loginPw,
      authorized: true
    };
    res.render('index', {
      loginId: req.session.user.id,
      loginPw: req.session.user.pw
    });
  }

});

/**
 * 관리자 로그아웃
 * @route {All} /logout
 */
router.all('/logout', function(req, res) {
  if (req.session.user) {
    console.log('logout 처리');
    req.session.destroy(
      function(err) {
        if (err) {
          console.log('session delete err');
          return;
        }
        console.log('session delete success!');
        res.render('login');
      }
    );
  } else {
    console.log('login이 안되어 있음!');
    res.render('login');
  }
});

module.exports = router;
