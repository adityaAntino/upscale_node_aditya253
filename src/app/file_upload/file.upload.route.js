const router = require('express').Router()
const fileUploadController = require('./file.upload.controller')
const { upload } = require('./file.upload.middleware')

router.post('/upload-file',upload.single('file'),fileUploadController.uploadFile);

module.exports = router;