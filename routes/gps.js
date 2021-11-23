const express = require('express');
const controller = require('../controllers/gps');
const router = express.Router();

router.get('/driverRouteID', controller.driverRouteID);

router.patch('/', controller.update);

module.exports = router;
