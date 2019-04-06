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

router.all('/fileDownload/:id', function(req, res) {
  /**
   * 선택한 데이터의 id를 가져온다.
   * id에 대한 filename, savefile을 가져온다
   * savedfile NAME명으로 파일 path를 선언
   * filepath만 리턴해준다. 
   * 나머지는 클라에서 path를 받아 처리
   */
  // console.log(req.params.id);
  var dataId = req.params.id;
  console.log(dataId);

  var sql = 'SELECT originFile, saveFile FROM datainfo WHERE id = ?';
  var param = [ dataId ];

  dbPool.query(sql, param, function(err, rows){
    if (err) {
      console.log(err);
    }
    // var result = {
    //   data: ''
    // };
    // result.data = rows;
    // res.send(result);
    console.log(rows);
  
  

  origFileNm = rows[0].originFile;
  savedFileNm = rows[0].saveFile;
  savedPath = '/Users/rladn/git/wkimdev-marketplace/tmp';

  var file = savedPath + '/' + savedFileNm;
  console.log('file : ' + file);

  // // mimetype = mime.lookup(origFileNm);
  // // mimetype = mime.lookup(file)
  // // console.log('mimetype : ' + mimetype);

  // 어떻게 된거지??
  // 아래 처럼 해야 원본 파일명을 다운로드 된다...
  res.setHeader('Content-disposition', 'attachment; filename=' + encodeURI(origFileNm)); // origFileNm으로 로컬PC에 파일 저장
  res.setHeader('Content-type', 'image/jpeg');

  const filePath = path.join(savedPath, savedFileNm);

  var filestream = fs.createReadStream(filePath);
  // 입력 스트림과 출력 스트림을 연결해준다. 
  filestream.pipe(res);
  });
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
