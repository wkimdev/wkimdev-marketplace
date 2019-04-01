var camelcaseKeys = require('camelcase-keys');
var dbPool = require('../util/dbPool');
//var connection = dbPool.init();

function dbTest() {

}

/**
 * dbTest 리스트
 */
dbTest.prototype.selectDataTypeList = function(callback) {
  var sql = ' SELECT * FROM datatype; ';

  connection.query(
    sql,
    function(err, rows) {
      if (err) console.log(err);
      else console.log(rows);
      callback(err, camelcaseKeys(rows));
    }
  );
};
