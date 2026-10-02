const mongoose = require('mongoose');
const {Schema}= mongoose

const subcategorySchema = new Schema({
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

    parentcategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category',
    }
});

module.exports = mongoose.model('subcategory', subcategorySchema);