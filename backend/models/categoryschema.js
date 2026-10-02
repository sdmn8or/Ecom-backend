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
    },
     owner:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
        }
});

module.exports = mongoose.model('category', categorySchema);