const redis = require('./redis');

exports.denylistToken = (token, userid) => redis.rpush([String(userid), String(token)]);

exports.checkDenylistedToken = (token, userid) => new Promise((resolve, reject) => {
    redis.lrange(String(userid), 0, -1, (err, reply) => {
        if (err) reject(err);
        resolve(reply.includes(String(token)));
    });
});