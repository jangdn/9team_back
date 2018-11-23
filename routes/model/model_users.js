var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    "userId": String,
    "birth" : String,
    "email" : String,
    "phy_attr" : Array,
    "wantItem" : Array,
});

module.exports = mongoose.model('user',UserSchema)
