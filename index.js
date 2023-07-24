const http = require('http');
const { hostname } = require('os');
const { serverHeader } = require('./common_functions.js')
const port = 3000


const server = http.createServer((req, res) => {
    const { method, url } = req;
    if (method === 'GET' && url == '/') {
        serverHeader(res,200);
        res.end('Welcome to Home Page!');
    }
    else if (method === 'GET' && url === '/about') {
        serverHeader(res,200);
        res.end('This is about page');
    }
    else if (method === 'POST' && url === '/submit') {
        serverHeader(res,200);
        res.end('Request Submitted');
    }
    else {
        serverHeader(400);
        res.end('Page not found');
    }
});

server.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}`)
});
