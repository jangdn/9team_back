var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var RecomSchema = new Schema({
    "itemId": String,
});

module.exports = mongoose.model('recommand',RecomSchema)
