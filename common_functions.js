    
    
    const serverHeader = function(res,statusCode,contentType){
        res.writeHead(statusCode,{'Content-type': `${contentType}`});
    }


    module.exports = { serverHeader };