const router = require('express').Router();
const randomstring = require("randomstring");
var mongoose = require('mongoose');
const Item = require('./model/model_items')
const User = require('./model/model_users')
const Review = require('./model/model_reviews')

const reviewData =[
    {
        "reviewId": randomstring.generate(10),
        "email" : "jangdn@a",
        "itemId" : "dddddddddd",
        "title" : "정말 잘 맞아요!!",
        "content" : "이 옷은 제 신체 특성에 잘 맞는 옷이에요!",
    },

    {
        "reviewId": randomstring.generate(10),
        "email" : "jangdn@a",
        "itemId" : "dddddddddd",
        "content" : "이 옷은 제 신체 특성에 하나도 맞지 않아서 잘 보시고 선택하셨으면 좋겠어요",
    },
    {
        "reviewId": randomstring.generate(10),
        "email" : "jangdn@a",
        "itemId" : "eeeeeeeeee",
        "content" : "귀찮아요",
    },
    {
        "reviewId": randomstring.generate(10),
        "email" : "jangdn@naver.com",
        "itemId" : "dddddddddd",
        "content" : "왜 나만 안 맞지;;",
    },
    
    {
        "reviewId": randomstring.generate(10),
        "email" : "jangdn@naver.com",
        "itemId" : "dddddddddd",
        "content" : "오오오오",
        "up" : 101,
    },
    
    {
        "reviewId": randomstring.generate(10),
        "email" : "jangdn@naver.com",
        "itemId" : "dddddddddd",
        "content" : "이제보니 잘 맞네",
        "up" : 200,
    },
]

router.post('/adddirect', (req, res) => {
    for (var i = 0; i < reviewData.length; i++){
        console.log(i); 
        var add_review = new Review();
        add_review.reviewId = reviewData[i].reviewId;
        add_review.email = reviewData[i].email;
        add_review.itemId = reviewData[i].itemId;
        add_review.content = reviewData[i].content;
        add_review.up = reviewData[i].up;

        console.log(add_review);
        add_review.save()
            .then(result => console.log(result))
            .catch(err => console.log(err));
    };
    res.json({result:"review update"});
});

router.post('/items/:itemId', (req, res) => {
    const email = req.user.email;
    const itemId = req.params.itemId;
    var add_review = new Review();
    add_review.reviewId = randomstring.generate(10);
    add_review.email = email;
    add_review.itemId = itemId;
    //add_review.content = req.body.content;
    add_review.content = req.body.contents;
    add_review.phy_attr = req.body.phyAttr;
    
    add_review.save()
        .then(result => res.status(200).json({success : true}))
        .catch(err => res.status(400).json({message : "post fail"}));
    
});
    /*
    User.findOne({email : email})
        .then((user) =>{
            console.log(user);
            add_review.phy_attr = user.phy_attr;
            return add_review;
        })
        .then((add_review) =>{
            add_review.save();
            console.log(add_review);
        })
        .catch((err) => console.log(err));
    */

router.put('/up/:reviewId', (req, res) => {
    const { reviewId } = req.params;
    Review.findOne({reviewId : reviewId},(err, review) => {
        console.log(review);
        if(err) return res.status(500).json({ error: 'database failure' });
        if(!review) return res.status(404).json({ error: 'user not found' });
        review.up = review.up+1;
        console.log(review.up);
        review.save(function(err){
            if(err) res.status(500).json({error: 'failed to up'});
            res.json({message: 'review up!'});
        });
    });
});

router.get('/items/:itemId', (req, res) => {
    const { itemId } = req.params;
    console.log(itemId);
    Review.find({itemId : itemId},(err, review)=>{
      if(err) return res.status(500).json({error: err});
      if(!review) return res.status(404).json({error: 'item not found'});
      //console.log(item);
      res.json(review);
    });
});

router.get('/users/:userId', (req, res) => {
    const { userId } = req.params;
    console.log(userId);
    Review.find({userId : userId},(err, review)=>{
      if(err) return res.status(500).json({error: err});
      if(!review) return res.status(404).json({error: 'item not found'});
      //console.log(item);
      res.json(review);
    });
  });

router.get('/today', (req, res) => {
    Review.find({"up":{$gte:100}},(err, review)=>{
        if(err) return res.status(500).json({error: err});
        if(!review) return res.status(404).json({error: 'review not found'});
        //console.log(item);
        console.log(review.length);
        var rand = Math.floor((Math.random() * review.length));
        console.log(rand);

        res.json(review[rand]);
    });
});

router.get('/recent', (req, res) => {
    Review.sort({"public_date":-1},(err, reviews)=>{
        if(err) return res.status(500).json({error: err});
        if(!reviews) return res.status(404).json({error: 'review not found'});
        //console.log(item);
        res.json(reviews.slice(0,4));
    });
});

module.exports = router;