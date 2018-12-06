var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReviewSchema = new Schema({
    "reviewId": String,
    "email" : String,
    "nickname" : String,
    "itemId" : String,
    "public_date" : {type : Date, default : Date.now},
    "content" : String,
    "weight" : String,
    "height" : String,

    "rating" : {type : Number, default : 0},
    "phy_attr" : Array,
    "up" : {type : Number, default : 0},
});

module.exports = mongoose.model('review',ReviewSchema);
