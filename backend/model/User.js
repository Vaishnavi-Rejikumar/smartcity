const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        max: 255,
        min: 10
    },
    password:{
        type: String,
        required: true,
        max: 1024,
        min: 7
    },
    date:{
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('User',userSchema);