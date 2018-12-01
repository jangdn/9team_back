var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

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

// userSchema.methods.generateHash = function(password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };
// //password의 유효성 검증
// userSchema.methods.validPassword = function(password) {
//     return bcrypt.compareSync(password, this.local.password);
// };


module.exports = mongoose.model('user',UserSchema)
