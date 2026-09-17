const express = require("express");
const _ = express.Router();
const { alluserscontroller} = require("../controllers/admincontroller");


_.get('/all-users', alluserscontroller);


module.exports = _;