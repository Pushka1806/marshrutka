const express = require('express');
const controller = require('../controllers/auth');
const router = express.Router();

//localhost:5000/api/auth/login
router.post('/login', controller.login);

//localhost:5000/api/auth/register
router.post('/register', controller.register);

router.get('/getInfo', controller.getInfo);

module.exports = router;
