const { getAllEvents } = require('../modules/events');

module.exports = (app) => app.get('/api/events', getAllEvents);
