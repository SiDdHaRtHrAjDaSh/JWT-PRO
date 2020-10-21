const express = require('express');
const Router = express.Router();

const uv = require('../validators/auth');


const refreshAuth = require('../middlewares/refreshAuth');


const auth = require('../controllers/auth');



Router.post('/login', uv.login, auth.login);

Router.post('/newtokens', refreshAuth, auth.newTokens);

module.exports = Router;