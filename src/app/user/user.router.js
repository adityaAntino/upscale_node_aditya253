const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();
const userController = require('./user.controller')
const { decodeToken } = require('./user.middleware')


router.get('/get-user-details', decodeToken, userController.getUserDetails);

router.put('/update-user-details', decodeToken, userController.updateUserDetails);

router.delete('/delete-user',decodeToken, userController.deleteUser);

module.exports = router;

