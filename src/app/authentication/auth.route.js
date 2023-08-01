const express = require('express')
const router = express.Router()
const authController = require('./auth.controller')


///REGISTER
router.post('/register',authController.register);

///LOGIN
router.post('/login',authController.login);
 
///FORGOT PASSWORD 
router.post('/forgot-password',authController.forgotPassword);

module.exports = router;
