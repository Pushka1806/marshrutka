const mongoose = require("mongoose");
const {Schema} = require("mongoose");
const userSchema = new Schema({
    _id:{
        login:{
            type: String,
            required: true,
            unique: true
        },
        password:{
            type: String,
            required: true
        },
        flag:Number
        
    },
    routeID: String,
    route: Array,
    quanPassengers: Number,
    workAuto: Boolean
})

module.exports = mongoose.model('driver_autos', userSchema);
