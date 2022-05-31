const mysql = require('mysql');
const connection = require('./sql-connection');

async function getAllEvents(req, res) {
  try {
    let sql = `SELECT event.name AS event_name, 
      description, address, date,
      city.name AS city_name, 
      country.name AS country_name FROM event INNER JOIN city
      ON event.city = city.pk
      INNER JOIN country
      ON city.country = country.pk;`;

    connection.query(sql, (err, results) => {
      res.send(results);
    });
  } catch (err) {
    console.log('An error happened in function getAllEvents: ', err.message);
    res.end(err.message);
  } finally {
    connection.end();
  }
}

module.exports = {
  getAllEvents
}
