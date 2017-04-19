var url = require('url');
var logger = require('../tools/logger');
var count = require('../models/count');

module.exports = function (req, res) {
    var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

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