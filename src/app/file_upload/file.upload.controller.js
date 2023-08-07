const router = require('express').Router()
const fs = require('fs');
const path = require('path');


///UPLOAD FILE
exports.uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded.' });
        }
        res.status(200).json({ message: 'File uploaded successfully.', filename: req.file.filename });
    }
    catch (error) {
        return res.status(500).json({ error: 'Failed to upload file.' });
    }
}

///GET UPLOADED FILES
exports.getUploadedFile = async (req, res) => {
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

///DELETE UPLOADED FILES
exports.deleteUploadedFile = async (req, res) => {
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