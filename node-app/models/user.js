const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        require: true,
        unique: true,
        type: String,
    },
    email: {
        require: true,
        unique: true,
        type: String,
    },
    isAdmin: {
        type: Number,
        default: 0,
    },
    password: {
        require: true,
        type: String, 
    }
})

module.exports=mongoose.model('User', userSchema);