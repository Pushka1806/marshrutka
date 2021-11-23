const mongoose = require("mongoose");
const {Schema} = require("mongoose");
const userSchema = new Schema({
    login:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('users', userSchema);
