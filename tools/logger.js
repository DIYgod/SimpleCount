var log4js = require('log4js');
log4js.configure({
    appenders: [
        {
            type: "file",
            filename: 'logs/Count.log',
            maxLogSize: 20480,
            backups: 3,
            category: [ 'Count','console' ]
        },
        {
            type: "console"
        }
    ],
    replaceConsole: true
});
var logger = log4js.getLogger('Count');
logger.setLevel('INFO');

module.exports = logger;