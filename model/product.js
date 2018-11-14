var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    id: String,
    image: String,
    size: String,
    page_link : String,
    //tag : {main_ctg : String, sub_ctg : String, brand : String}
    //published_date: { type: Date, default: Date.now  }
});

module.exports = mongoose.model('product', ProductSchema);

/*
var book = new Book({
    name: "NodeJS Tutorial",
    author: "velopert"
});
book.save(function(err, book){
    if(err) return console.error(err);
    console.dir(book);
});
*/