const express = require('express');
const router = express.Router();
const userController = require('./user.controller')
const { decodeToken } = require('./user.middleware')


router.get('/get-user-details', decodeToken, userController.getUserDetails);

router.get('/get-all-user', decodeToken, userController.getAllUser);

router.put('/update-user-details', decodeToken, userController.updateUserDetails);

router.delete('/delete-user', decodeToken, userController.deleteUser);

module.exports = router;

