const { check } = require('express-validator');


exports.login = [
    check('username')
        .exists()
        .withMessage('Username is required')
        .trim()
        .customSanitizer(value => {
            return value.toLowerCase();
        })
    ,
    check('password')
        .exists()
        .trim()
        .isLength({ min: 6 })
        .isLength({ max: 20 })
        .withMessage('Invalid username or password')
]