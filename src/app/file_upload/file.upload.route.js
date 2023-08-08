const router = require('express').Router()
const fileUploadController = require('./file.upload.controller')
const  uploadMiddleware  = require('./file.upload.middleware')
const multer = require('multer');
const upload = multer({});


router.post('/upload-file',upload.single('file'),fileUploadController.uploadFile);

router.get('/get-local-uploaded-file',fileUploadController.getLocalUploadedFiles);

router.delete('/delete-local-uploaded-file',fileUploadController.deletLocalUploadedFile);

router.delete('/delete-from-aws',fileUploadController.deleteUploadedFileFromAws);

module.exports = router;