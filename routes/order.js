const express = require('express');
const controller = require('../controllers/order');
const router = express.Router();

router.get('/', controller.getAll)      // получение всех активных заявок       \\ ещё не написан (04.03.2022)

router.post('/getallOrderByStop', controller.getAllOrderByStop)     // получение всех заявок по маршрутам

router.post('/createOrder', controller.create)      // создание новой заявки

router.post('/disableOrder', controller.disableOrder)       // отмена заявки, полное удаление

router.post('/deleteOrder', controller.deleteOrder)        // завершение заявки, удаление из файла активных, перенов в файл с отработанными заявками

module.exports = router;