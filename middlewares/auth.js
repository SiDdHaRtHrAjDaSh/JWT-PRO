const verifyJWT = require('../jwtService/accessToken/verifyJWT');

module.exports = (req, res, next) => {
    const token = req.get('Authorization');
    if (!token) {
        console.log('asdf', err);
        return res.status(401).json({
            "error": {
                "msg": 'Token is invalid'
            }
        });
    }
    verifyJWT(token)
        .then(user => {
            req.user = user;
            next();
        }).catch(err => {
            console.log('ZXC', err);
            res.status(401).json({
                "error": {
                    "msg": err
                }
            });
        });
}