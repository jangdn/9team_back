var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    "email" : String,
    "password" : String,
    "name" : String,
    "birth" : String,
    "weight" : String,
    "height" : String,
    "phy_attr" : Array,
    "wantItem" : Array,
});

module.exports = mongoose.model('user',UserSchema)
