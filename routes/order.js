const express = require('express');
const controller = require('../controllers/order');
const router = express.Router();

router.get('/', controller.getAll);

router.post('/createOrder', controller.create);

router.post('/disableOrder', controller.disableOrder);

module.exports = router;