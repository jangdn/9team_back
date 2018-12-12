var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ItemSchema = new Schema({
    "itemId": String,
    "name" : String,
    "price" : String,
    "link" : String,
    "image_link": String,
    "main_ctg" : String,
    "sub_ctg" : String,
    "brand" : String,
    "tags" : Array,
    "rating" : {type : Number, default : 0},
    "count" : {type : Number, default : 0},
    /*col_size: {
      col_size: Array, 
      raw_size : Array,
        size_array: Array{Array},
    }
    */
    //대분류, 소분류, 색상, 브랜드 순서!
    //published_date: { type: Date, default: Date.now  }
});

module.exports = mongoose.model('item',ItemSchema)