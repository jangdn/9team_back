const router = require('express').Router();
const randomstring = require("randomstring");
const randomItem = require('random-item')

var passport = require('passport');
const Item = require('./model/model_items')
const User = require('./model/model_users')


const firNick = new Array('강철의', '강력한','멋있는','튼튼한','반짝이는','도발적인','분노의','위대한','민첩한','빛나는','큰','작은','애매한','익명의','잘생긴','예쁜','펄럭이는','나약한','타락한','취한','낡은','어둠의','결의에찬',
'저주받은','살아있는','움직이는','빠른','즐거운','지루한','매력적인','매혹적인','헝클어진','우아한','품격있는','화려한','담백한','아늑한','쾌적한','빈약한',
'야생의','어마어마한','전설의','어설픈','만들다만','성실한','단호한','넉넉한','정직한','솔직한','똑똑한','이기적인','성공한','현명한','엉뚱한','슬기로운','폐인의','당혹한','어설픈',
'우울한','선망하는','사나운','격렬한','무력한','수수한','불안해하는','피곤한','짖궃은','국왕의','마법사의','전사의','도적의','해적의','버려진','주워입은','바드의','아르카나의','최고의',
'도전적인','합리적인','유익한','민감한','노련한','혼잡한','공손한','무례한','헌신적인','갈망하는','명중의','진취적인','재능있는','필살의','악의','울고있는',
'웃고있는','금지된','봉인된','추운','따뜻한','생각하는','얕은','위태로운','맛있는','얌전한','이상한','촉촉한','난처한','음주의','집요한','추적하는','그리운','깊은',
'가난한','고운','까다로운','명백한','당연한','의외의','일반적인','귀중한','보물의','거대한','소환사의','저격의','따분한','대표적인','성급한','원활한','매끄러운','유효한','쓸데없는','훌륭한',
'청결한','넓은','붉은','날카로운','푸른','노란','우수한','고귀한','장난치는')

const secNick = new Array('드레스','츄리닝','수영복','교복','군복','한복','페도라','원피스','투프시','와이셔츠','블라우스','케이프','가죽 재킷','블레이저','가운',
'폴로 셔츠','트렌치 코트','반바지','핫팬츠','슬랙스','스키니진','미니스커트','롱스커트','구두','캔버스화','슬리퍼','귀도리','비니','스냅백','양복','코트','바바리','가디건','스웨터','터틀넥','패딩','야상','난닝구','아우터','청바지','윗도리','파카','바람막이','재킷','양말','블랙진','화이트진','목장갑','수건','후드티','수면양말','후드집업','야구잠바','롱패딩')


const phyData = [
    '좁은 어깨', '배가 나옴', '짧은 팔', '두꺼운 허벅지', '큰 골반', '큰 엉덩이', '두꺼운 종아리', '긴 다리', '큰 발 볼',
];

const userData =[
    {
        "birth" : "930409",
        "email" : "jangdn@naver.com",
        "phy_attr" : ["좁은 어깨"],
        "password" : "akdntm90",
        "wantItem" : ["eeeeeeeeee"]
    },

    {
        "birth" : "940510",
        "email" : "jangd@naver.com",
        "phy_attr" : ["긴 다리", "큰 발 볼"],
        "password" : "akdntm90",
        "wantItem" : ["eeeeeeeeee"]
    },

    {
        "birth" : "950611",
        "email" : "jag@naver.com",
        "phy_attr" : ["두꺼운 허벅지", "큰 골반",],
        "password" : "akdntm90",
        "wantItem" : ["eeeeeeeeee", "dddddddddd"]
    },
    
    {
        "birth" : "960712",
        "email" : "jagn@naver.com",
        "phy_attr" : ["두꺼운 종아리", "긴 다리",],
        "password" : "akdntm90",
        "wantItem" : ["dddddddddd"]
    },
]



router.get('/phyData', (req, res) => {
    res.json(phyData);
});

router.get('/favorites', (req, res) => {
    // console.log(req.query);
    // console.log(req.params);
    // res.json(Object.keys(categories));
    User.findOne({email : req.user.email})
        .then((user) => {
            return Item.find({'itemId':{$in: user.wantItem}});
        })
        .then((result) => {res.json(result)})
        .catch((err) => {
            res.status(400).json(err);
        });

    // User.find({email : req.user.email},(err, items)=>{
    //   if(err) return res.status(500).json({error: err});
    //   if(!items) return res.status(404).json({error: 'favorite items is not found'});
    //   res.json(items);
    // });
  });

router.delete('/favorites/:itemId', (req, res) => {
    const itemId = req.params;
    User.findOne({email : req.user.email},(err, user)=>{
        user.wantItem.splice(user.wantItem.indexOf(itemId),1);
        user.save()
            .then(result => res.status(200).json({"success" : true}))
            .catch(err => res.status(404).json(err));
    });
});


router.get('/', (req, res) => {
    const email = req.user.email;
    const nickname = req.user.nickname;
    const password = req.user.password;
    // console.log(req.query);
    // console.log(req.params);
    // res.json(Object.keys(categories));
    return res.json({email, nickname, password});
});

router.put('/nick', (req, res) => {
  User.findOne({email : req.user.email},(err, user) => {
      console.log(user);
      if(err) return res.status(500).json({ error: 'database failure' });
      if(!user) return res.status(404).json({ error: 'user not found' });
      //ITEM
      user.nickname = randomItem(firNick) + randomItem(secNick);
      //console.log(user);
      user.save(function(err){
          if(err) res.status(500).json({error: 'failed to update'});
          res.status(200).json({success : true});
      });
  });
});

router.put('/', (req, res) => {
    User.findOne({email : req.user.email},(err, user) => {
        console.log(user);
        if(err) return res.status(500).json({ error: 'database failure' });
        if(!user) return res.status(404).json({ error: 'user not found' });
        //ITEM
        if(req.body.email)
            user.email = req.body.email;        
        if(req.body.password)
            user.password = req.body.password;
        user.save(function(err){
            if(err) res.status(500).json({error: 'failed to update'});
            res.status(200).json({success : true});
        });
    });
});


  /*
  "userId": String,
  "birth" : String,
  "email" : String,
  "phy_attr" : Array,
  "wantItem" : Array,
  */
router.post('/adddirect', (req, res) => {
    for (var i = 0; i < userData.length; i++){
        console.log(i); 
        var add_user = new User();
        add_user.birth = userData[i].birth;
        add_user.email = userData[i].email;
        add_user.password = userData[i].password;
        add_user.phy_attr = userData[i].phy_attr;
        add_user.wantItem = userData[i].wantItem;

        console.log(add_user);
        add_user.save()
            .then(result => console.log(result))
            .catch(err => console.log(err));
    };
    res.json({result:"user update"});
});

router.get('/call', function(req, res) {
    // deserializeUser에서 추가로 저장한 정보까지 전달 받음
    console.log(req.user);
    return res.json(req.user);
});
//req.session.passport.user => id

router.get('/phyAttr', function(req, res) {
    // deserializeUser에서 추가로 저장한 정보까지 전달 받음
    console.log(req.user);
    const phyAttr = req.user.phy_attr;
    const height = req.user.height;
    const weight = req.user.weight;
    return res.json({phyAttr, height, weight});
});

router.put('/phyAttr', function(req, res) {
    // deserializeUser에서 추가로 저장한 정보까지 전달 받음
    User.findOne({email : req.user.email},(err, user) => {
        console.log(user);
        if(err) return res.status(500).json({ error: 'database failure' });
        if(!user) return res.status(404).json({ error: 'user not found' });
        //ITEM
        if(req.body.weight)
            user.weight = req.body.weight;
        if(req.body.height)
            user.height = req.body.height;
        if(req.body.phyAttr)
            user.phy_attr = req.body.phyAttr;
        console.log(user.phy_attr);
        user.save(function(err){
            if(err) res.status(500).json({error: 'failed to update'});
            res.status(200).json({success : true});
        });
    });
});

//userId 생기면 바꿔야할 부분
router.put('/favorites/:itemId', (req, res) => {
    const { itemId } = req.params;
    User.find({$and:[{email : req.user.email},{wantItem : {$ne : itemId}}]},(err, user) => {
        if(err) return res.status(500).json({ error: 'database failure' });
        if(!user[0]) return res.status(404).json({ error: 'already enrolled' });
        //ITEM
        user[0].wantItem.push(itemId);
        console.log(user[0].wantItem);
        user[0].save(function(err){
            if(err) res.status(500).json({error: 'failed to update'});
            res.status(200).json({success : true});
        });
    });
});



module.exports = router;