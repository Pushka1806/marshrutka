const express = require('express');
const controller = require('../controllers/stops');
const router = express.Router();

router.get('/getAll', controller.getAll);
router.get('/getStopByName', controller.getAvailableStops);
router.get('/getRoutesByStops', controller.getRoutesByStops);
router.get('/getRoute', controller.getRoutes);
router.get('/getRouteById', controller.getRouteById);
module.exports = router;
