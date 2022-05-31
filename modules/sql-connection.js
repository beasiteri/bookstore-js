const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user     : 'bea',
  password : 'Localhost22!',
  database: 'library'
});
 
connection.connect(function(err) {
  if (err) throw err;
  console.log('MySql Connected...');
});

module.exports = connection;
