const express = require('express');
const Router = express.Router();


const user = require('../controllers/user');
const auth = require('../middlewares/auth');

Router.get('/getTexts', auth, user.getTexts);

Router.post('/addTexts', auth, user.addTexts);

module.exports = Router;