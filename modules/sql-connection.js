const { MySQL } = require("mysql-promisify");

const db = new MySQL({
  host: 'localhost',
  user     : 'bea',
  password : 'Localhost22!',
  database: 'library'
});

module.exports = db;
