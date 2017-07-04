
const express = require('express');
const controller = require('../controllers/earthquake.controller');

let earthquake = express.Router();
earthquake.post('/:id', controller.saveEarthquake);

module.exports = earthquake;