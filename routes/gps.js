const express = require('express');
const controller = require('../controllers/gps');
const router = express.Router();

router.get('/driverRouteID', controller.driverRouteID);

module.exports = router;
