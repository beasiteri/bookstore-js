const mysql = require('mysql');
const db = require('./sql-connection');

async function getAllEvents(req, res) {
  try {
    const { results } = await db.query({
      sql: `SELECT event.name AS event_name, 
      description, address, date,
      city.name AS city_name, 
      country.name AS country_name FROM event INNER JOIN city
      ON event.city = city.pk
      INNER JOIN country
      ON city.country = country.pk;`
    });

    res.send(results);
  } catch (err) {
    console.log('An error happened in function getAllEvents: ', err.message);
    res.end(err.message);
  } finally {
    await db.end();
  }
}

module.exports = {
  getAllEvents
}
