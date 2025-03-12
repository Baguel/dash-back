const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: {
        require: true,
        unique: true,
        type: String,
    },
    picture: {
        unique: true,
        type: String,
    },
    Url: {
        default: "",        
        type: String,
    }
})

module.exports=mongoose.model('Service', serviceSchema);