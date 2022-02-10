const express = require('express');
const controller = require('../controllers/gps');
const router = express.Router();

router.get('/AvailableZakaz', controller.AvailableZakaz);
router.get('/getJpsByStops', controller.getJpsByStops);

module.exports = router;
