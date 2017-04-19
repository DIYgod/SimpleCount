var url = require('url');
var logger = require('../tools/logger');
var count = require('../models/count');

module.exports = function (req, res) {
    count.distinct('id', function (err, data) {
        if (err) {
            logger.error(err);
        }

        var json = ``;
        for (var i = 0; i < data.length; i++) {
            json += `<a href="./?id=${data[i]}&action=get">${data[i]}</a><br>`;
        }
        res.send(json);
    })
};