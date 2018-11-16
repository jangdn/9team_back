const router = require('express').Router();
const randomstring = require("randomstring");
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const cheerio = require('cheerio');
const request = require('request');

/* size_table 예시
const size_table ={
    sizeHeader: ['95', '100', '105', '110'],
      partSizeHeader: [
        '가슴둘레', '목깊이', '목넓이', '밑단둘레', '소매길이', '소매밑단(카우스)', '소매중통', '소매통', '암홀(A.H)', '총기장'
      ],
      sizes: [
        ['97', '8', '18.5', '87', '83.5', '19', '27', '34.5', '29', '68'],
        ['102', '8.5', '19', '92', '85', '20', '28', '36', '30', '70'],
        ['107', '9', '19.5', '97', '86.5', '21', '29', '37.5', '31', '72'],
        ['113', '9.5', '20', '103', '88', '22', '30', '39', '32', '74'],
      ]
    }
*/

var ItemSchema = new Schema({
    itemId: String,
    name : String,
    price : String,
    link : String,
    image_link: String,
    /*size: {sizeHeader: String,
    partSizeHeader: {String},
    sizes:},*/
    //대분류, 소분류, 색상, 브랜드 순서!
    tags : Array
    //published_date: { type: Date, default: Date.now  }
});

const Item = mongoose.model('Item', ItemSchema);

const itemData = {
  itemId : randomstring.generate(10),
  name : "모직 루즈핏 싱글 코트",
  price : "59800",
  link : "http://smallman.co.kr/product/detail.html?product_no=100645&cate_no=39&display_group=2",
  image_link : "http://smallman.co.kr/web/product/big/201710/100645_shop1_988641.jpg",
  
  tags : ["아우터", "코트", "키작남", "베이지", "그레이", "블랙"],
}

const itemData_1 = {
  itemId : randomstring.generate(10),
  name : "8aw long duffle coat",
  price : "260100",
  link : "http://www.thet-shirtmuseum.com/shop/shopdetail.html?branduid=622949&xcode=028&mcode=000&scode=&type=P&sort=order&cur_code=028&GfDT=Zmp3UA%3D%3D",
  image_link : "http://tsmuseum.img13.kr/bbshop451/images/18aw_long_dufflecoat_cream12.jpg",
  
  tags : ["아우터", "코트", "더티셔츠뮤지엄", "크림"],
}


router.get('/', (req, res) => {
  console.log(req.query.tags);
  const tags = (req.query.tags).split(',');
  console.log(tags);
  // console.log(req.query);
  // console.log(req.params);
  // res.json(Object.keys(categories));
  Item.find({tags : {$in:tags}},(err, items)=>{
    if(err) return res.status(500).json({error: err});
    if(!items) return res.status(404).json({error: 'tag not define'});
    res.json(items);
  });
  /*
  res.json(Object.values(itemData).filter(item => {
    if(err) return res.status(500).json({error: err});
    if(!item) return res.status(404).json({error: 'item not found'});
    return tags.every(tag => item.tags.indexOf(tag) > -1);
  }));
  */
});


//크롤링 적용
router.post('/add_item', (req,res) => {
  var url = "http://www.topten10.co.kr/product/view.asp?productNo=41106";
  
  var add_item = new Item();
  dic={};
  request(url, function(err, res, body){

    const $ = cheerio.load(body);
    //상품 이름
    const name=$('.name').text();
    console.log(name);

    //상품 가격
    const price=$('.tPrice').contents()[0].data;
    console.log(price);

    //상품 이미지
    const image_link="http:"+$('#gvLargeImg').attr('presrc');
  
    dic['name']=name;
    dic['price']=price;
    dic['image_link']=image_link;
  });
  //add_item.tags = itemData.tags;
  //dictionary 생성
  
  add_item.itemId = randomstring.generate(10);
  add_item.name = dic['name'];
  add_item.price = dic['price'];
  add_item.link = url;
  add_item.image_link = dic['image_link'];
  add_item.tags = ["상의","셔츠","탑텐"];
  
  console.log(add_item);
  add_item.save(function(err){
    if(err)
    {
        console.error(err);
        res.json({result:0});
        return;
    }
    res.json({result:1});
  }); 
});

router.post('/add_item1', (req,res) => {
  var add_item = new Item();
  add_item.itemId = itemData.itemId;
  add_item.name = itemData.name;
  add_item.price = itemData.price;
  add_item.link = itemData.link;
  add_item.image_link = itemData.image_link;
  add_item.tags = itemData.tags;
  console.log(add_item);
  /*size: {sizeHeader: String,
  partSizeHeader: {String},
  sizes:},*/
  add_item.save(function(err){
      if(err)
      {
          console.error(err);
          res.json({result:0});
          return;
      }
      res.json({result:1});
  });
});

router.get('/:itemId', (req, res) => {
  const { itemId } = req.params;
  console.log(itemId);
  Item.findOne({itemId : itemId.slice(1)},(err, item)=>{
    if(err) return res.status(500).json({error: err});
    if(!item) return res.status(404).json({error: 'item not found'});
    res.json(item);
  });
});


module.exports = router;
