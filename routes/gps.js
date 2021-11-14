const express = require('express');
const controller = require('../controllers/gps');
const router = express.Router();

router.get('/', controller.getAll);

router.patch('/', controller.update);

module.exports = router;
