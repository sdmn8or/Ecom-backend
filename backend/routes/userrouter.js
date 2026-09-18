const express = require("express");
const {usercontroller,craetecategory,getallcategory,updateCategory,deleteCategory} = require("../controllers/usercontroller");
const _ = express.Router();


_.get('/products', usercontroller);
_.post('/create/category', craetecategory);
_.get('/categories', getallcategory);
_.put("/update/category/:id", updateCategory);
_.delete("/delete/category/:id", deleteCategory);



module.exports = _;