const express = require("express");
const {usercontroller} = require("../controllers/usercontroller");
const _ = express.Router();


_.get('/products', usercontroller);



module.exports = _;