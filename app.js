const express = require('express');
const app = express();
const cors = require('cors');
const redis = require('./store/redis');

require('dotenv').config();


app.use(cors());
app.use(express.json());

const auth = require('./routes/auth');
const user  = require('./routes/user');

app.use((req, res, next) => {
    console.log(Date.now(), req.originalUrl);
    next();
});

app.use('/auth', auth);
app.use('/user', user);

app.get('*', (req, res, next) => {
    res.send('404');
});

redis.on('connect', function () {
    console.log('Redis connected!');
    app.listen(process.env.PORT, err => console.log(`Server rocks on ${process.env.PORT}`));
});
