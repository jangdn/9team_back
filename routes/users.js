const router = require('express').Router();
const randomstring = require("randomstring");

var passport = require('passport');
const Item = require('./model/model_items')
const User = require('./model/model_users')

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