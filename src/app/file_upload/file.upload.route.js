const router = require('express').Router()
const fileUploadController = require('./file.upload.controller')

const  uploadMiddleware  = require('./file.upload.middleware')

const multer = require('multer');
const upload = multer({});


router.post('/upload-file',upload.single('file'),fileUploadController.uploadFile);

router.get('/get-uploaded-file',fileUploadController.getUploadedFile);

router.delete('/delete-uploaded-file',fileUploadController.deleteUploadedFile);

module.exports = router;