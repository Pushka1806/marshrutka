const mongoose = require('mongoose');

const StopsSchema = new mongoose.Schema({
    _id : String,
    availableStops: Array,
    }
);

module.exports = mongoose.model('passenger_stops', StopsSchema);
