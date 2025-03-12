const mongoose = require('mongoose');
const user = require('../models/user');

const { Schema } = mongoose;
const dashSchema = new mongoose.Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    service_id: {
        type: Schema.Types.ObjectId,
        ref: 'Service',
    }
})

module.exports=mongoose.model('Dash', dashSchema);