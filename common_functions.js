    
    
    const serverHeader = function(res,statusCode){
        res.writeHead(statusCode,{'Content-type': 'text/plain'});
    }


    module.exports = { serverHeader };