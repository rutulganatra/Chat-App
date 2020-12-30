const {validationResult } =  require('express-validator');


exports.validate = (req, res, next) => {
    var errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    next()
}