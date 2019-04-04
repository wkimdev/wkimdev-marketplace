var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var dbPool = require('../util/dbPool');
var hashFiles = require('hash-files');

bodyParser.urlencoded({
  extended: true
});

bodyParser.json();

/* GET users listing. */
router.get('/', function(req, res) {
  // 세션에 login아이디가 없으면 로그인 하라는 alert를 보여줘야 한다. --> 안그러면 error 
  res.render('products', {
    //loginId: req.session.user.id
    loginId: 'bob'
  });
});

router.get('/fileDownload', function(req, res) {

  // 다운로드 경로
  // console.log(__dirname);
  var filePath = 'c:/Users/rladn/git/wkimdev-marketplace/tmp/540fe88c0b25fb6b78ffeef17fbf1b1c936fa9de';
  // // filePath에 있는 파일 스트림 객체를 얻어온다.(바이트 알갱이를 읽어옵니다.)
  var fileStream = fs.createReadStream(filePath);

  // // 다운로드 한다.(res 객체에 바이트알갱이를 전송한다)
  fileStream.pipe(res);

});

router.get('/getData', function(req, res) {
  var sql = 'SELECT di.id, dt.title, di.field01, di.field02, di.field03, di.field04, di.field05, di.provider, di.adddate ' +
    'FROM datainfo di JOIN datatype dt ON di.datatypeId = dt.id';

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

router.post('/addData', function(req, res) {
  // console.log(req.body);
  // console.log("ch1 :" + req.files.file_upload);
  // console.log("ch2 :" + req.files.file_upload.name);
  // console.log("ch3 :" + req.files.file_upload.md5);

  /** file download ing */
  var file = req.files.file_upload.name;

  hashFiles(file, function(err, hash) {
    if (Object.keys(req.files).length == 0) {
      return res.status(400).send('No files were uploaded.');
    }

    let file_upload = req.files.file_upload;
    // let file_path = '/Users/doublechain/Documents/workspace/wkimdev-marketplace/tmp/';
    let file_path = 'c:/Users/rladn/git/wkimdev-marketplace/tmp/';

    file_upload.mv(file_path + hash, function(err) {
      if (err)
        return res.status(500).send(err);

      res.send('File uploaded!');
    });

  });

  /** data field add */
  // var sql = " INSERT INTO datainfo SET ? ";
  // var params = {
  //   datatypeId: 1, //var datatypeId = req.body.datatypeId;
  //   field01: req.body.field01,
  //   field02: req.body.field01,
  //   field03: req.body.field03,
  //   field04: req.body.field04,
  //   field05: req.body.field05,
  //   price: req.body.price,
  //   traded: false,
  //   provider: 'bob', // 추후에 session 으로 change
  //   adddate: new Date()
  // };

  // dbPool.query(
  //   sql,
  //   params,
  //   function(err, results) {
  //     if (err) {
  //       console.log(err);
  //     }
  //     console.log(results);
  //     res.json(results);
  //   });
})

module.exports = router;
