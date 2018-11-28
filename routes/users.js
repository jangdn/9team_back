const router = require('express').Router();
const randomstring = require("randomstring");
var mongoose = require('mongoose');
const Item = require('./model/model_items')
const User = require('./model/model_users')
const passport = require('passport')

const phyData = [
    '좁은 어깨', '배가 나옴', '짧은 팔', '두꺼운 허벅지', '큰 골반', '큰 엉덩이', '두꺼운 종아리', '긴 다리', '큰 발 볼',
];

const userData =[
    {
        "userId" : "aaaaaaaaaa",
        "birth" : "930409",
        "email" : "jangdn@naver.com",
        "phy_attr" : ["다리 긺", "팔 긺", "허벅지 두꺼움", "안경"],
        "wantItem" : ["eeeeeeeeee"]
    },

    {
        "userId" : "bbbbbbbbbb",
        "birth" : "940510",
        "email" : "jangd@naver.com",
        "phy_attr" : ["다리 짧음", "팔 짧음"],
        "wantItem" : ["eeeeeeeeee"]
    },

    {
        "userId" : randomstring.generate(10),
        "birth" : "950611",
        "email" : "jag@naver.com",
        "phy_attr" : ["종아리 두꺼움", "어깨 넓음",],
        "wantItem" : ["eeeeeeeeee", "dddddddddd"]
    },
    
    {
        "userId" : randomstring.generate(10),
        "birth" : "960712",
        "email" : "jagn@naver.com",
        "phy_attr" : ["어깨 좁음", "팔 긺",],
        "wantItem" : ["dddddddddd"]
    },
]

router.get('/phyData', (req, res) => {
    res.json(phyData);
});

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
        add_user.userId = userData[i].userId;
        add_user.birth = userData[i].birth;
        add_user.email = userData[i].email;
        add_user.phy_attr = userData[i].phy_attr;
        add_user.wantItem = userData[i].wantItem;

        console.log(add_user);
        add_user.save()
        .then(result => console.log(result))
        .catch(err => console.log(err));
    };
    res.json({result:"user update"});
});


//userId 생기면 바꿔야할 부분
router.put('/:userId/favorites/:itemId', (req, res) => {
    const { userId } = req.params;
    const { itemId } = req.params;
    console.log(userId, itemId);
    User.findOne({userId : userId},(err, user) => {
        console.log(user);
        if(err) return res.status(500).json({ error: 'database failure' });
        if(!user) return res.status(404).json({ error: 'user not found' });
        //ITEM
        user.wantItem.push(itemId);
        console.log(user.wantItem);
        user.save(function(err){
            if(err) res.status(500).json({error: 'failed to update'});
            res.status(200).json({message: 'user want updated'});
        });
    });
});

/*
router.post('/:userId', (req, res) => {
    const { userId } = req.params;
    var update_data = ["xAuLbL7tSa"];
    //data 처리부분 수정해야함
    //var update_data = req.body.update_data;
    User.findOne({userId : userId},(err, user) => {
        console.log(user);
        if(err) return res.status(500).json({ error: 'database failure' });
        if(!user) return res.status(404).json({ error: 'user not found' });
        user.userId = userId;
        user.wantItem = update_data;
        console.log(user.wantItem);
        user.save(function(err){
            if(err) res.status(500).json({error: 'failed to update'});
            res.json({message: 'user want updated'});
        });
    });
});
*/


module.exports = router;