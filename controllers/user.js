const redis = require('../store/redis');

exports.getTexts = (req, res, next) => {

    try {
        redis.lrange(`Texts ${String(req.user.id)}`, 0, -1, (err, reply) => {
            if (err) throw (err);
            res.status(200).json({
                texts: reply
            })
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({});
    }

}


exports.addTexts = (req, res, next) => {

    try {
        redis.rpush([`Texts ${String(req.user.id)}`, req.body.newText]);
        res.status(200).json({});
    } catch (err) {
        console.log(err);
        res.status(500).json({});
    }

}