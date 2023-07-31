const jwt = require('jsonwebtoken');
const User = require('../authentication/auth.schema')
const env = require('../../../env/config');


const decodeToken = async function(req,res,next){
    try{
        const customToken = req.headers.authorization.split('Bearer ').pop();
        const decoded = jwt.verify(customToken, env.jwtSecretKey);
        const user = await User.findOne({_id: decoded.userId});
        req.user = user;
        next();
    }catch(error){
        next(error);
    }
}


module.exports = {decodeToken}