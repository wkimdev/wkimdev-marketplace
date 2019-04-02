var mysql = require('mysql');

var conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'market'
});

conn.connect();

// if (process.env.NODE_ENV == 'production') {
//   config = {
//     host: '',
//     user: '',
//     password: '',
//     port: '',
//     database: ''
//   };
// } else if (process.env.NODE_ENV == 'development') {
//   config = {
//     host: 'localhost',
//     user: 'root',
//     password: '1234',
//     port: 3306,
//     database: 'market'
//   };
// }

// var _mysqlPool = {
//   //   init: function() {
//   //return mysql.createPool(config);
//   //return mysql.createConnection(config);

//   //   }
// };


module.exports = conn;
