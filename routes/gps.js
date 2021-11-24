const express = require('express');
const controller = require('../controllers/gps');
const router = express.Router();

router.get('/AvailableZakaz', controller.AvailableZakaz);

module.exports = router;
