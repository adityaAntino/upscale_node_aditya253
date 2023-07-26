
const express = require('express');
const app = express();
require('dotenv').config();
const env  = require('./env/config');
const port = process.env.PORT || 5500;
const crudRouter = require('./src/app/crud/crud')

app.use(express.json({}));

app.get('/',async(req,res) =>{
console.log('server running 1');
return res.status(200).json({
    message: "application is working."
})
});

app.use("/crud",crudRouter);

app.listen(port, ()=>{
    console.log(`Server Started at Port ${port}`);
})

 