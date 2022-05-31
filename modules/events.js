const mysql = require('mysql');
const connection = require('./sql-connection');

async function getAllEvents(req, res) {
  let sql = `SELECT * FROM event INNER JOIN city
  ON event.city = city.pk
  INNER JOIN country
  ON city.country = country.pk;`;
  connection.query(sql, (error, results) => {
    if (error) {
      return console.error(error.message);
    }
    res.send(results);
  });

  connection.end();
}

module.exports = {
  getAllEvents
}
