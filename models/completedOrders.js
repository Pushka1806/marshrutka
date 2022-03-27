const mongoose = require('mongoose')

const completedOrdersSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    start: String,
    stop: String,
    routeID: Array,
    date: String,
    waitAuto: Boolean,
})

module.exports = mongoose.model('completed_orders', completedOrdersSchema)