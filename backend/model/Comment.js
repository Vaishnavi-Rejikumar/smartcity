const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        max: 255,
        min: 10
    },
    name:{
        type: String,
        required: true,
        max: 1024,
        min: 7
    },
    message:{
        type: String,
        required:true,
        min: 7

        
    }

});

module.exports = mongoose.model('Comment',commentSchema );