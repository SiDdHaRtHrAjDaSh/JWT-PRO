const store = require('../store/store');
const { validationResult } = require('express-validator');

const sha256 = require("js-sha256").sha256;

const accessTokenCreator = require('../jwtService/accessToken/generateJWT');
const refreshTokenCreator = require('../jwtService/refreshToken/generateJWT');


exports.login = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const username = req.body.username;
    const password = req.body.password;

    //We use dummy username and password
    const match = (username === 'testuser' && password === '#testuser4');
    
    const result = {
        _id: 'hjfaj62j2345jj43kj4',
        name: 'Chintu',
    }

    if (match) {
        const payload = {
            id: result._id,
            name: result.name,
            username
        };

        const accessToken = accessTokenCreator(payload);
        const refreshToken = refreshTokenCreator(payload);

        return res.status(200).json(
            {
                name: result.name,
                userID: result._id,
                username: username,
                accessToken,
                refreshToken
            }
        );
    } else {
        //Password not match
        res.status(401).json({
            err: "Invalid credentials"
        });
    }
}




exports.newTokens = (req, res, next) => {
    try {
        const oldRefreshToken = req.token;


        //here we hash token before storing
        const refreshTokenHashed = sha256(oldRefreshToken);


        //This is async. but we can handle it syncally.
        store.denylistToken(refreshTokenHashed, req.userToken.id);

        const payload = {
            ...req.userToken
        };

        const accessToken = accessTokenCreator(payload);
        const refreshToken = refreshTokenCreator(payload);

        res.status(200).json({
            accessToken,
            refreshToken
        });

    }
    catch (err) {
        res.status(500).json();
        console.log(err);
    }
}