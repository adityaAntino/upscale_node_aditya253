    
    
    const serverHeader = function(res,statusCode,contentType){
        console.log('here')
        res.writeHead(statusCode,{'Content-type': `${contentType}`});
    }


    module.exports = { serverHeader };