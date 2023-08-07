const router = require('express').Router()
const fileUploadController = require('./file.upload.controller')
const  upload  = require('./file.upload.middleware')

router.post('/upload-file',upload,fileUploadController.uploadFile);

router.get('/get-uploaded-file',fileUploadController.getUploadedFile);

router.delete('/delete-uploaded-file',fileUploadController.deleteUploadedFile);

module.exports = router;