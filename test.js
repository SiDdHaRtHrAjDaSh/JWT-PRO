const redis = require('./store/redis');


redis.rpush(['framewrks', 'angularjs', 'backbone']);



redis.lrange('framewrks', 0, -1, function (err, reply) {
    console.log(reply); // ['angularjs', 'backbone']
});
