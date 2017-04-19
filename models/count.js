var mongoose = require('../tools/mongodb');
var countSchema = new mongoose.Schema({
    id: String,
    count: Number,
    key: String
});
var count = mongoose.model('count', countSchema);

module.exports = count;