const router = require('express').Router();
const randomstring = require("randomstring");
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    "userId": String,
    "birth" : String,
    "email" : String,
    "phy_attr" : Array,
    "wantItem" : Array,
});

const User = mongoose.model('user', UserSchema);

const user_data =[
    {
        "userId" : randomstring.generate(10),
        "birth" : "930409",
        "email" : "jangdn@naver.com",
        "phy_attr" : ["다리 긺", "팔 긺", "허벅지 두꺼움", "안경"],
        "wantItem" : ["eeeeeeeeee"]
    },
]

module.exports = router;