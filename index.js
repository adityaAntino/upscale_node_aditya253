
const express = require('express');
const req = require('express/lib/request');
const app = express();
require('dotenv').config();
const env  = require('./env/config');
const port = process.env.PORT || 5500;
const crudRouter = require('./src/app/crud')

app.use("./crud",crudRouter);


app.listen(env.port,()=>{
    console.log(`Server Started at Port ${port}`);
})

 
///CREATION & ROUTING OF NODE SERVER USING EXPRESS

// const server = http.createServer((req, res) => {
//     const { method, url } = req;
//         console.log(`method ${method} url ${url}`)
//     if (method === 'GET' && url === '/') {
    
//         serverHeader(res, 200, 'text/plain');
//         res.end('Welcome to Home Page!');
//     }
//     else if (method === 'GET' && url === '/about') {
//         serverHeader(res, 200, 'text/plain');
//         res.end('This is about page');
//     }
//     else if (method === 'POST' && url === '/submit') {
//         serverHeader(res, 200, 'text/html');
//         res.end('Request Submitted');
//     }
//     else {
//         serverHeader(400);
//         res.end('Page not found', 'text/plain');
//     }
// });

// server.listen(port, hostname, () => {
//     console.log(`Server is running at http://${hostname}:${port}`)
// });
