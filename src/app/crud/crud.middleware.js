
const Joi = require('joi')


const dataSchema = Joi.object({
    data: Joi.number().required().strict()
});

function joiValidator(req,res,next){

    const {error}  = dataSchema.validate(req.body, {abortEarly: false});

    if(error) {
        const errors = error.details.map((err) => err.message);
    return res.status(401).json({ errors });
    }

    next();
}

module.exports = joiValidator;