
const express = require('express');
const app = express();
require('dotenv').config();
const env = require('./env/config');
const mongoose = require('mongoose')
const crudRoute = require('./src/app/crud/crud.route');
const authRoute = require('./src/app/authentication/auth.route')

app.use(express.json({}));

app.get('/', async (req, res) => {
    console.log('server running 1');
    return res.status(200).json({
        message: "application is working."
    });
});

app.use("/crud", crudRoute);
app.use("/auth", authRoute);

mongoose.connect(env.db_connectionString.db);
app.listen(env.port, () => {
    console.log(`Server Started at Port ${env.port}`);
})

