const express = require("express");
const _ = express.Router();
const {registrationController,loginController,verifyEmailController,forgotpasswordController, resetpasswordcontroller} = require('../controllers/authcontroller');




_.post('/registration', registrationController);
_.post('/login', loginController);
_.get('/verify/:token', verifyEmailController);
_.post('/forgot-password', forgotpasswordController);
_.post('/reset-password/:token', resetpasswordcontroller);

module.exports = _;