
const express = require('express');
const app = express();
require('dotenv').config();
const env = require('./env/config');
const mongoose = require('mongoose')
const crudRoute = require('./src/app/crud/crud.route');
const authRoute = require('./src/app/authentication/auth.route')
const userRoute = require("./src/app/user/user.router")
const productRoute = require("./src/app/product/product.route")
const axiosRoute = require("./src/app/axios/axios.route")
const fileUploadRoute = require('./src/app/file_upload/file.upload.route')

app.use(express.json({}));

app.get('/', async (req, res) => {
    return res.status(200).json({
        message: "Application is working."
    });
});

///ENTRY ROUTES
app.use("/crud", crudRoute);
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/axios",axiosRoute);
app.use("/file-upload",fileUploadRoute);

mongoose.connect(env.db_connectionString.db);
app.listen(env.port, () => {
    console.log(`Server Started at Port ${env.port}`);
})

