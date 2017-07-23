var url = require('url');
var fs = require('fs');
var logger = require('../tools/logger');
var count = require('../models/count');

module.exports = function (req, res) {
    var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    // check black ip
    var blanklist = fs.readFileSync('blacklist').toString().split('\n');
    if (blanklist.indexOf(ip.split(',')[0]) !== -1) {
        logger.info(`Reject form ${ip} for black ip.`);
        res.send(`{"code": -1, "msg": "Rejected for black ip."}`);
        return;
    }

    var query = url.parse(req.url,true).query;
    var id = query.id;
    var action = query.action || 'get';

    logger.info(`Count id ${id} action ${action}, IP: ${ip}`);

    if (action === 'add') {
        count.update({ id: id }, { $inc: { count: 1 } }, { upsert: true }, function (err, raw) {
            if (err) {
                logger.error(err);
            }
        });
    }
    count.findOne({ id: id }, function (err, data) {
        if (err) {
            logger.error(err);
        }
        if (data) {
            res.send(data.count + '');
        }
        else {
            res.send('0');
        }
    });
};