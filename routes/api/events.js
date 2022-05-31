const express = require('express');
const router = express.Router();
const { getAllEvents } = require('../../modules/events');

router.get('/', (req, res) => {
  getAllEvents(req, res);
});

module.exports = router;
