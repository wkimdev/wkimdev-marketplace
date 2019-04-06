var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var dbPool = require('../util/dbPool');
var hashFiles = require('hash-files');
var mime = require('mime');
var fs = require('fs');
const path = require('path');


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

  origFileNm = 'test.jpg';
  savedFileNm = 'e089ab3ba83bf8a90b69c92d23cf3611cae8953f';
  savedPath = '/Users/doublechain/Documents/workspace/wkimdev-marketplace/tmp';

  var file = savedPath + '/' + savedFileNm;
  console.log('file : ' + file);

  // mimetype = mime.lookup(origFileNm);
  // mimetype = mime.lookup(file)
  // console.log('mimetype : ' + mimetype);

  res.setHeader('Content-disposition', 'attachment; filename=' + origFileNm); // origFileNm으로 로컬PC에 파일 저장
  res.setHeader('Content-type', 'image/jpeg');

  const filePath = path.join(__dirname, 'e089ab3ba83bf8a90b69c92d23cf3611cae8953f');

  var filestream = fs.createReadStream(filePath);
  // 입력 스트림과 출력 스트림을 연결해준다. 
  filestream.pipe(res);

});

router.get('/getData', function(req, res) {
  var sql = 'SELECT di.id, dt.title, di.field01, di.field02, di.field03, di.field04, di.field05, ' + 
            'di.provider, di.adddate, di.price, di.traded, di.saveFile ' +
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
  console.log(req.body);
  // console.log("ch1 :" + req.files.file_upload);
  console.log("ch2 :" + req.files.file_upload.name); // origin file name
  console.log("ch3 :" + req.files.file_upload.md5);  // saved file name

  if(!req.files.file_upload.name){
    var originFile = 'null';
    var saveFile = 'null';
  } else {
    var originFile = req.files.file_upload.name;
    var saveFile = req.files.file_upload.md5;
  }

  /** file download ing */
  var file = req.files.file_upload.md5;

  // hashFiles(file, function(err, hash) {
  if (Object.keys(req.files).length == 0) {
    return res.status(400).send('No files were uploaded.');
  }

  let file_upload = req.files.file_upload;
  // 성공
  // let file_path = '/Users/doublechain/Documents/workspace/wkimdev-marketplace/tmp/' + file;
  let file_path = 'c:/Users/rladn/git/wkimdev-marketplace/tmp/';
  
  // 윈도우일 경우 로컬 경로 다시 확인!
  // let file_path = '/Users/rladn/git/wkimdev-marketplace/tmp/';

  // file_upload.mv(file_path + hash, function(err) {
  file_upload.mv(file_path + file, function(err) {
    if (err)
      return res.status(500).send(err);

    //res.send('File uploaded!');
    console.log("File uploaded!");
  });

  // });

  /** data field add */
  var sql = " INSERT INTO datainfo SET ? ";
  var params = {
    datatypeId: 1, //var datatypeId = req.body.datatypeId;
    field01: req.body.field01,
    field02: req.body.field01,
    field03: req.body.field03,
    field04: req.body.field04,
    field05: req.body.field05,
    price: req.body.price,
    traded: false,
    provider: 'bob', // 추후에 session 으로 change
    adddate: new Date(),
    originFile: originFile,
    saveFile: saveFile
  };

  dbPool.query(
    sql,
    params,
    function(err, results) {
      if (err) {
        console.log(err);
      }
      console.log(results);
      res.send("data add successed! "+results);
    });
})

module.exports = router;
