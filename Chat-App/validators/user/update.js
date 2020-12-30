const { body } = require('express-validator');

exports.rules = (() => {
    return [
        body('firstName').notEmpty(),
        body('lastName').notEmpty(),
        body('email').notEmpty().isEmail(),
        body('password').notEmpty().isLength(5),
        body('gender').optional().notEmpty(),
    ]
})()