const mongoose = require('mongoose');
const {Schema}= mongoose

const categorySchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    status:{
        type:String,
        default:'deactive',
        enum:['active','deactive']
    }
});

module.exports = mongoose.model('category', categorySchema);