const express = require("express");
const _ = express.Router();
const { alluserscontroller,singleusercontroller,activeusercontroller,deactiveusercontroller,updateusercontroller,deleteUser} = require("../controllers/admincontroller");


_.get('/all-users', alluserscontroller);
_.get('/user/:id', singleusercontroller);
_.get('/active/users', activeusercontroller);
_.get('/deactive/users', deactiveusercontroller);
_.post('/update/user/:id', updateusercontroller);
_.delete("/delete/user/:id", deleteUser);


module.exports = _;