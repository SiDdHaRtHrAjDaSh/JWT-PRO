const verifyJWT = require('../jwtService/refreshToken/verifyJWT');
const store = require('../store/store');
const sha256 = require("js-sha256").sha256;

module.exports = (req, res, next) => {
    const token = req.body.refreshToken;
    if (!token) {
        return res.status(401).json({
            "error": {
                "msg": 'No refresh token found'
            }
        });
    }
    
    verifyJWT(token)
        .then(async userToken => {

            const tokenHashed = sha256(token);

            if (await store.checkDenylistedToken(tokenHashed, userToken.id)) {
                res.status(401).json({
                    "error": {
                        "msg": 'This refresh token is in denylist'
                    }
                });
            } else {
                req.userToken = userToken;
                req.token = token;
                next();
            }

        }).catch(err => {
            console.log(err);
            res.status(401).json({
                "error": {
                    "msg": err
                }
            });
        });
}