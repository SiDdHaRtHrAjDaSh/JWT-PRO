const jwt = require('jsonwebtoken');
const uuid = require('uuid');

const jwtSecretString = process.env.ACCESS_TOKEN_SECRET_KEY;

module.exports = payload => {
    payload.uuid = uuid.v4();
    return jwt.sign({ user: payload }, jwtSecretString, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
}