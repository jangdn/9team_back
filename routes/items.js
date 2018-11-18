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
    tags : Array,
    /*main_ctg = String,
    sub_ctg = String,
    color = String,
    col_size: {
      col_size: Array, 
      raw_size : Array,
        size_array: Array{Array},
    }
    */
    //대분류, 소분류, 색상, 브랜드 순서!
    //published_date: { type: Date, default: Date.now  }
});

const Item = mongoose.model('item', ItemSchema);

//1
const itemData = [
{
  itemId : randomstring.generate(10),
  name : "모직 루즈핏 싱글 코트",
  price : "59800",
  link : "http://smallman.co.kr/product/detail.html?product_no=100645&cate_no=39&display_group=2",
  image_link : "http://smallman.co.kr/web/product/big/201710/100645_shop1_988641.jpg",
  
  tags : ["아우터", "코트", "키작남", "베이지", "그레이", "블랙"],
},
//2
{
  itemId : randomstring.generate(10),
  name : "데일리 기능성 슬렉스",
  price : "19500",
  link : "http://smallman.co.kr/product/detail.html?product_no=100286&cate_no=2815&display_group=2 ",
  image_link : "http://smallman.co.kr/Product/pants/170906_DG_top_5.jpg",
  
  tags : ["하의","슬렉스","키작남","베이지","그레이","브라운","블랙","크림","차콜","네이비"],
},
//3
{
  itemId : randomstring.generate(10),
  name : "실키후리스풀짚재킷",
  price : "29900",
  link : "https://store-kr.uniqlo.com/display/showDisplayCache.lecs?goodsNo=NQ31113950&displayNo=NQ1A01A11A13&stonType=P&storeNo=83&siteNo=50706#prodDetail",
  image_link : "https://simage-kr.uniqlo.com/goods/31/11/39/50/408996_COL_COL35_1000.jpg",
  
  tags : ["아우터", "재킷","유니클로","오프화이트","그레이","블랙","레드","와인","브라운","다크그린","블루","네이비"],
},
//4
{
  itemId : randomstring.generate(10),
  name : "18FW 그레이 컬러 블록 올 블렌드 노버튼 카디건",
  price : "59900",
  link : "http://www.ssfshop.com/8seconds/GM0018101573048/good?dspCtgryNo=SFMA42A03A02&brandShopNo=BDMA07A01&brndShopId=8SBSS&keyword=&leftBrandNM=&utag=ref_cat:SFMA42A03A02$ref_brn:BDMA07A01$ref_br:8SBSS$set:1$dpos:2",
  image_link : "http://img.ssfshop.com/cmd/LB_477x630/src/http://img.ssfshop.com/goods/8SBR/18/10/15/GM0018101573048_0_ORGINL.jpg",
  
  tags : ["상의","스웨터","에잇세컨즈","그레이"],
},
//5
{
  itemId : randomstring.generate(10),
  name : "18FW 블랙 기모 사이드 지퍼 트레이닝 팬츠",
  price : "49900",
  link : "http://www.ssfshop.com/8seconds/GM0018101573061/good?dspCtgryNo=SFMA42A04&brandShopNo=BDMA07A01&brndShopId=8SBSS&keyword=&leftBrandNM=&utag=ref_cat:SFMA42A04$ref_brn:BDMA07A01$ref_br:8SBSS$set:1$dpos:1",
  image_link : "http://img.ssfshop.com/cmd/LB_477x630/src/http://img.ssfshop.com/goods/8SBR/18/10/15/GM0018101573061_0_ORGINL.jpg",
  
  tags : ["하의","치노팬츠","에잇세컨즈","블랙"],
},
//6
{
  itemId : randomstring.generate(10),
  name : "18FW 블랙 울 블렌디드 포켓 셔츠",
  price : "59900",
  link : "http://www.ssfshop.com/8seconds/GM0018103082584/good?dspCtgryNo=SFMA42A02&brandShopNo=BDMA07A01&brndShopId=8SBSS&keyword=&leftBrandNM=&utag=ref_cat:SFMA42A02$ref_brn:BDMA07A01$ref_br:8SBSS$set:1$dpos:5",
  image_link : "http://img.ssfshop.com/cmd/LB_477x630/src/http://img.ssfshop.com/goods/8SBR/18/10/30/GM0018103082584_0_ORGINL.jpg",
  
  tags : ["상의","셔츠","에잇세컨즈","블랙"],
},
//7
{
  itemId : randomstring.generate(10),
  name : "18FW 블랙 페이크 레더 덤블 집업 무스탕 재킷",
  price : "139900",
  link : "http://www.ssfshop.com/8seconds/GM0018103082572/good?dspCtgryNo=SFMA42A05&brandShopNo=BDMA07A01&brndShopId=8SBSS&keyword=&leftBrandNM=&utag=ref_cat:SFMA42A05$ref_brn:BDMA07A01$ref_br:8SBSS$set:1$dpos:11",
  image_link : "http://img.ssfshop.com/cmd/LB_477x630/src/http://img.ssfshop.com/goods/8SBR/18/10/30/GM0018103082572_0_ORGINL.jpg",
  
  tags : ["아우터","재킷","에잇세컨즈","블랙"],
},
//8
{

  itemId : randomstring.generate(10),
  name : "파인니트 스웨터",
  price : "29000",
  link : "https://www2.hm.com/ko_kr/productpage.0564358023.html",
  image_link : "https://lp2.hm.com/hmgoepprod?set=source[/35/0f/350f2a325671fe0a4c680c16b752b69615997748.jpg],origin[dam],category[men_cardigansjumpers_jumpers],type[LOOKBOOK],res[m],hmver[1]&call=url[file:/product/main]",
  
  tags : ["상의","스웨터","에이치앤엠","네이비"],
},
//9
{
  itemId : randomstring.generate(10),
  name : "집업 가디건",
  price : "59000",
  link : "https://www2.hm.com/ko_kr/productpage.0401020001.html",
  image_link : "https://lp2.hm.com/hmgoepprod?set=source[/be/82/be82b49c248b279231631446871d1fa361156f44.jpg],origin[dam],category[men_cardigansjumpers_cardigans],type[LOOKBOOK],res[m],hmver[1]&call=url[file:/product/main]",
  
  tags : ["상의","스웨터","에이치앤엠","다크그레이"],
},
//10
{
  itemId : randomstring.generate(10),
  name : "18FW 그레이 기모 트레이닝 후드 집업",
  price : "59900",
  link : "http://www.ssfshop.com/8seconds/GM0018092768029/good?dspCtgryNo=SFMA42A01&brandShopNo=BDMA07A01&brndShopId=8SBSS&keyword=&leftBrandNM=&utag=ref_cat:SFMA42A01$ref_brn:BDMA07A01$ref_br:8SBSS$set:1$dpos:41",
  image_link : "http://img.ssfshop.com/cmd/LB_477x630/src/http://img.ssfshop.com/goods/8SBR/18/09/27/GM0018092768029_0_ORGINL.jpg",
  
  tags : ["상의","후드","에잇세컨즈","그레이"],
},
//11
{
  itemId : randomstring.generate(10),
  name : "프리미엄 캐시미어 라운드 니트",
  price : "98100",
  link : "http://www.coor.kr/shop/shopdetail.html?branduid=2588591&xcode=009&mcode=002&scode=&type=X&sort=order&cur_code=009&GfDT=bm56W11C",
  image_link : "http://coorcoor.img5.kr/MS_product/2588591/1537366802_997316.jpg",
  
  tags : ["상의","스웨터","쿠어","아보카도"],
},
//12
{
  itemId : randomstring.generate(10),
  name : "Crudo Check Double Coat Houndstooth",
  price : "318250",
  link : "http://tonywack.com/product/11%EC%9B%9413%EC%9D%BC-%EC%88%9C%EC%B0%A8%EB%B0%9C%EC%86%A1%EC%A0%9C%ED%92%88-crudo-check-double-coat-houndstooth/474/category/42/display/1/#",
  image_link : "http://tonywack.com/web/product/extra/small/201809/48a89fb26611bdc7bb5265e6e14f5e5a.jpg",
  
  tags : ["아우터","코트","도니웩","체크"],
},
//13
{
  itemId : randomstring.generate(10),
  name : "미니멀 크롭 자켓 그레이",
  price : "139000",
  link : "http://mrpokerface.co.kr/product/detail.html?product_no=333&cate_no=30&display_group=1",
  image_link : "http://mrpokerface.co.kr/web/product/17ss/mimal%20jacket/grey/pre1NEW.jpg",
  
  tags : ["아우터","재킷","포커페이스","그레이"],
},
//14
{
  itemId : randomstring.generate(10),
  name : "루이스 하프넥 니트",
  price : "25000",
  link : "http://moyen.co.kr/product/detail.html?product_no=14438&cate_no=25&display_group=2",
  image_link : "http://moyen.co.kr/web/product/big/201810/e2cb8f5bc2d95a4dbe2fd3f77eb24da5.jpg",
  
  tags : ["상의","니트","모옌","블랙"],
},
//15
{
  itemId : randomstring.generate(10),
  name : "Lamb Skin Rider Jacket",
  price : "148000",
  link : "http://lafudgestore.com/product/detail.html?product_no=1314&cate_no=94&display_group=1",
  image_link : "http://lafudgestore.com/web/product/big/201808/b2139cfcb5efe8b2c49221de9776935d.jpg",
  
  tags : ["아우터","재킷","라퍼지스토어","블랙"],
},
//16
{
  itemId : randomstring.generate(10),
  name : "Black Knife Cutting Crop Fit",
  price : "96000",
  link : "http://fatalism.co.kr/product/detail.html?product_no=438&cate_no=73&display_group=1",
  image_link : "http://fatalism.co.kr/web/product/big/201808/0a5b5b7b63d9a6a62cd4c78048870bc1.jpg",
  
  tags : ["하의","청바지","페이탈리즘","블랙"],
},
//17
/*
{
  itemId : randomstring.generate(10),
  name : "덕 다운 웜업 벤치 파카 화이트",
  price : "298000",
  link : "http://www.covernat.net/product.php?mode=view&ca_id=a010&id=1218",
  image_link : "http://www.covernat.net/data/product/5badb57208ba6.jpg",
  
  tags : ["아우터","롱패딩","커버낫","화이트"],
},
*/
//18
{
  itemId : randomstring.generate(10),
  name : "Layla Endless Love Fluff Mood Check shirt S24 Navy",
  price : "48000",
  link : "http://diamondlayla.com/product/detail.html?product_no=223&cate_no=56&display_group=1",
  image_link : "http://diamondlayla.com/web/product/big/201809/4bda1c36672ee9bde4021e75a7528957.jpg",
  
  tags : ["상의","셔츠","다이아몬드레이라","네이비"],
},
//19
/*
{
  itemId : randomstring.generate(10),
  name : "Herringbone Twill Slit Knit Vest",
  price : "49900",
  link : "http://costumeoclock.com/product/detail.html?product_no=1586&cate_no=4&display_group=1",
  image_link : "http://costumeoclock.com/web/product/big/201809/c1488a4847062ef2de2a2f0535f68bb1.jpg",
  
  tags : ["상의","조끼","커스텀어클락","네이비"],
},
*/
//20
{
  itemId : randomstring.generate(10),
  name : "Essential Basic Sweatshirt",
  price : "59000",
  link : "http://www.draw-fit.com/product/detail.html?product_no=658&cate_no=44&display_group=2",
  image_link : "http://www.draw-fit.com/web/product/big/201808/1d1b46dedf5e7853c7cc76c4b0cba008.jpg",
  
  tags : ["상의","셔츠","드로우핏","카멜"],
},

{
  itemId : randomstring.generate(10),
  name : "모직 루즈핏 싱글 코트",
  price : "59800",
  link : "http://smallman.co.kr/product/detail.html?product_no=100645&cate_no=39&display_group=2",
  image_link : "http://smallman.co.kr/web/product/big/201710/100645_shop1_988641.jpg",
  
  tags : ["아우터", "코트", "키작남", "베이지", "그레이", "블랙"],
},

{
  itemId : randomstring.generate(10),
  name : "8aw long duffle coat",
  price : "260100",
  link : "http://www.thet-shirtmuseum.com/shop/shopdetail.html?branduid=622949&xcode=028&mcode=000&scode=&type=P&sort=order&cur_code=028&GfDT=Zmp3UA%3D%3D",
  image_link : "http://tsmuseum.img13.kr/bbshop451/images/18aw_long_dufflecoat_cream12.jpg",
  
  tags : ["아우터", "코트", "더티셔츠뮤지엄", "크림"],
}
]


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


//find는 아무런 인자로 넘겨줄게 없을때 function으로 함수를 선언해야한다.
router.get('/all', (req, res) => {
  Item.find(function(err, items){
    if(err) return res.status(500).json({error: err});
    if(!items) return res.status(404).json({error: 'item not found'});
    res.json(items);
  });
});



//크롤링 적용
router.post('/add_item_crawling', (req,res) => {
  var url = "http://www.topten10.co.kr/product/view.asp?productNo=41114";
  
  var add_item = new Item();
  dic={};
  request(url, function(err, res, body){

    const $ = cheerio.load(body);
    //상품 이름
    const name=$('.name').text();

    //상품 가격
    const price=$('.tPrice').contents()[0].data;

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

router.post('/add_item_direct', (req, res) => {
  for (var i = 0; i < itemData.length; i++){
    console.log(i); 
    var add_item = new Item();
    add_item.itemId = itemData[i].itemId;
    add_item.name = itemData[i].name;
    add_item.price = itemData[i].price;
    add_item.link = itemData[i].link;
    add_item.image_link = itemData[i].image_link;
    add_item.tags = itemData[i].tags;
    console.log(add_item);
    add_item.save()
      .then(result => console.log(result))
      .catch(err => console.log(err));
    };
    res.json({result:1});
},);

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
