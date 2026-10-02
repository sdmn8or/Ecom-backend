const express = require("express");
const {craetecategory,getallcategory,updateCategory,deleteCategory,craetesubcategory,getallsubcategory,getallcategorywisesubcategory,getallownerwisecategory} = require("../controllers/vendorcontroller");
const _ = express.Router();


_.post('/create/category', craetecategory);
_.post('/create/subcategory', craetesubcategory);
_.get('/categories', getallcategory);
_.get('/subcategories', getallsubcategory);
_.get('/category/:id/subcategories', getallcategorywisesubcategory);
_.get('/owner/:id/categories', getallownerwisecategory);
_.put("/update/category/:id", updateCategory);
_.delete("/delete/category/:id", deleteCategory);



module.exports = _;