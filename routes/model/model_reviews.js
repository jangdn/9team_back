var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReviewSchema = new Schema({
    "reviewId": String,
    "email" : String,
    "itemId" : String,
    "public_date" : {type : Date, default : Date.now},
    "content" : String,
    "rating" : Number,
    "up" : {type : Number, default : 0},
    "phy_attr" : Array,
});

module.exports = mongoose.model('review',ReviewSchema);
