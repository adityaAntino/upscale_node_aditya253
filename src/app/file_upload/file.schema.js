const mongoose = require('mongoose');

const uploadedImageSchema = new mongoose.Schema({
    imageUrl: {type:String},
    uploadDate: {type:String},
    imageName: {type:String, unique:true,},
});


module.exports = mongoose.model('uploadedImage',uploadedImageSchema)