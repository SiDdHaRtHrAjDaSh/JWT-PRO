const jwt = require('jsonwebtoken');
const uuid = require('uuid');

const jwtSecretString = process.env.REFRESH_TOKEN_SECRET_KEY;

module.exports = payload => {
    payload.uuid = uuid.v4();
    payload.refreshToken = true;
    return jwt.sign({ user: payload }, jwtSecretString, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });
}