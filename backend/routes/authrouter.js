const express = require("express");
const _ = express.Router();
const {registrationController,loginController,verifyEmailController} = require('../controllers/authcontroller');




_.post('/registration', registrationController);

_.post('/login', loginController);
_.get('/verify/:token', verifyEmailController);

module.exports = _;