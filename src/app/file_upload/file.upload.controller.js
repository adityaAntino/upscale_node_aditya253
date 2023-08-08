const router = require('express').Router()
const fs = require('fs');
const path = require('path');
const aws = require('aws-sdk');
const env = require('../../../env/config')
const UploadedImageSchema = require('./file.schema');
const {v4: uuidv4} = require('uuid')
const customResponse = require("../../utilities/response.handler")


///UPLOAD FILE
exports.uploadFile = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json(
                { message: 'No file found to be uploaded.',statusCode: 400, });
        }

                ///set up aws
                aws.config.update(env.aws);

                const s3 = new aws.S3();
        
                const params = {
                    Bucket: env.aws.bucketName,
                    Key: uuidv4() +req.file.originalname,
                    Body: req.file.buffer,
                    ACL:'public-read'
                }

        s3.upload(params, async (error, data) => {
            if (error) {
                return res.status(500).json({ message: 'Error uploading to S3', error: error });
            }
  
            const uploadFile = await UploadedImageSchema.create({
                imageUrl: data.Location,
                uploadDate: Date(),
                imageName: params.Key
            });

            // res.status(200).json({ message: 'File uploaded successfully.', file: uploadFile});

            return res.send(customResponse('File Uploaded Successfully',true,200,uploadFile));
        });
    }
    catch (error) {
        return res.status(500).json({
            message: 'Failed to upload file.',
            error: error
        });
    }
}

///GET LOCAL FILES
exports.getLocalUploadedFiles = async (req, res) => {
    const fileInformation = [];
    fs.readdir('uploads/', function (err, files) {
        if (err) {
            res.status(500).send({
                message: "Unable to scan files!",
                error: err
            });
        } else if (files.length == 0) {
            res.status(404).send({
                message: "No Files Found!",
            });
        }

        files.forEach((file) => {
            fileInformation.push({
                name: file,
                size: file.size
            });
        });

        return res.status(200).json({
            message: 'Files Fetched Successfully',
            statusCode: 200,
            fileName: fileInformation
        });
    });
}

///DELETE LOCAL UPLOADED FILES
exports.deletLocalUploadedFile = async (req, res) => {
    const directory = 'uploads/';
    fs.readdir(directory, function (err, files) {
        if (err) {
            res.status(500).send({
                message: "Unable to scan files!",
                error: err
            });
        } else if (files.length == 0) {
            res.status(404).send({
                message: "No Files Found!",
                statusCode: 404
            });
        }

        files.forEach(file => {
            const filePath = path.join(directory, file);
            fs.unlink(filePath, err => {
                if (err) {
                    console.error('Error deleting file:', err);
                } else {
                    return true;
                }
            });
        });

        res.status(200).send({
            message: "Files deleted succesfully",
            statusCode: 200,
            deletedFile: filePath
        });

    });

}

///DELETE UPLOADED FILE FROM AWS
exports.deleteUploadedFileFromAws = async(req,res) => {
    const reqFileName = req.body.reqFileName;
    try{
                ///set up aws
                aws.config.update(env.aws);

                const s3 = new aws.S3();

                const params = {
                    Bucket: env.aws.bucketName,
                    Key: reqFileName,
                  };

                  const isFileAvailable = await UploadedImageSchema.findOne({
                    imageName: reqFileName
                  });
                  if(isFileAvailable){
                s3.deleteObject(params,async (error,data) =>  {
                    if(error){
                        res.status(400).send({
                            message: "Failed to delete file",
                            statusCode: 400,
                            error:error
                        });
                    }else{
                        const isDeletedFromDb = await UploadedImageSchema.findByIdAndDelete(isFileAvailable._id);
                        if(isDeletedFromDb){
                            res.status(200).send({
                                message: "File Deleted Successfully",
                                statusCode: 200,
                                data: data
                            });
                        }else{
                            res.status(400).send({
                                message: "Failed to delete from DB",
                                statusCode: 400,
                                error:error
                            });
                        }
                        
                    }
                });}else{
                    res.status(400).send({
                        message: `Unable to find file with filename - ${reqFileName}`,
                        statusCode: 400,
                     });
                }
    }
    catch(error){
        return res.status(500).json({
            message: 'Failed to delete file from aws.',
            error: error
        });
    }
}