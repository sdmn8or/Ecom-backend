const mongoose = require('mongoose');
const {Schema}= mongoose

const newSchema = new Schema({
    fullname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    terms:{
        type: Boolean,
        required: true
    },
    role:{
        type: String,
        enum : ['user', 'admin'],
        default: "user"
    },
    status:{
        type: String,
        enum : ['active', 'deactive'],
        default: "active"
    },
    isVerified:{
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('User', newSchema);