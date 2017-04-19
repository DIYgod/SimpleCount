var express = require('express');
var logger = require('./tools/logger');
require('./tools/mongodb');

logger.info(`🍻 Simple Count start! Cheers!`);

var app = express();
app.all('*', require('./routes/all'));
app.get('/', require('./routes/get'));
app.get('/list', require('./routes/list'));
app.listen(1204);