const router = require('express').Router();
const randomstring = require("randomstring");
const Item = require('./model/model_items')
const User = require('./model/model_users')
const Review = require('./model/model_reviews')
const randomItem = require('random-item')


const reviewData =[
    {
        "reviewId": randomstring.generate(10),
        "email" : "jangdn@a",
        "itemId" : "dddddddddd",
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
    },
    
    {
        "reviewId": randomstring.generate(10),
        "email" : "jangdn@naver.com",
        "itemId" : "dddddddddd",
        "content" : "이제보니 잘 맞네",
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

        console.log(add_review);
        add_review.save()
            .then(result => console.log(result))
            .catch(err => console.log(err));
            
    };
    res.json({result:"review update"});
});
/*
User.findOne({email : req.user.email})
    .then((user) => {
        return Item.find({'itemId':{$in: user.wantItem}});
    })
    .then((result) => {res.json(result)})
    .catch((err) => {
        res.status(400).json(err);
    });

*/

router.post('/items/:itemId', (req, res) => {
    const email = req.user.email;
    const nickname = req.user.nickname;
    const itemId = req.params.itemId;
    
    Review.findOne({itemId : itemId, email : email},(err, review) =>{
        if(!review)
        {
            var add_review = new Review();
            add_review.reviewId = randomstring.generate(10);
            add_review.email = email;
            add_review.nickname = nickname;
            add_review.itemId = itemId;
            //add_review.content = req.body.content;
            add_review.height = req.body.height;
            add_review.weight = req.body.weight;
            add_review.content = req.body.contents;
            add_review.phyAttr = req.body.phyAttr;
            add_review.rating = req.body.rating; 
            add_review.save()
            .catch(err => res.status(400).json({message : "post fail"}));
           
            
            User.findOne({email : email})
            .then(user =>{
                user.phyAttr = req.body.phyAttr;
                user.weight = req.body.weight;
                user.height = req.body.height;
                user.save();
            })
            .catch(err => res.status(400).json({message : "post fail"}))

            Item.findOne({itemId : itemId})
            .then(item =>{
                if(!item.rating)
                    item.rating = 0;
                var itemRating = item.rating;
                var itemCount = item.count;
                itemRating *= itemCount;
                itemRating += add_review.rating;
                itemCount += 1;
                item.rating = itemRating/itemCount;
                item.count = itemCount;
                console.log(item);
                item.save();
            })
            .then(result => res.status(200).json({success : true}))
            .catch(err => res.status(400).json({message : "post fail"}));
        }
        else   
        {
            review.content = req.body.contents;
            review.phyAttr = req.body.phyAttr;
            review.weight = req.body.weight;
            review.height = req.body.height;
            var beforerating = review.rating;
            review.rating = req.body.rating;
            review.save()
            .catch(err => res.status(400).json({message : "post fail"}));
            
            User.findOne({email : email})
            .then(user =>{
                user.phyAttr = req.body.phyAttr;
                user.weight = req.body.weight;
                user.height = req.body.height;
                user.save();
            })
            .catch(err => res.status(400).json({message : "post fail"}))

            Item.findOne({itemId : itemId})
            .then(item =>{
                if(!item.rating)
                    item.rating = 0;
                var itemRating = item.rating;
                var itemCount = item.count;
                itemRating *= itemCount;
                itemRating -= beforerating;
                itemRating += review.rating;
                item.rating = itemRating/itemCount;
                console.log(item);
                item.save();
            })
            .then(result => res.status(200).json({success : true}))
            .catch(err => res.status(400).json({message : "post fail"}));
        }
    })
    
});
   

router.put('/:reviewId', (req, res) => {
    const reviewId = req.params.reviewId;
    Review.findOne({reviewId : reviewId},(err, review)=>{
        if(err) return res.status(500).json({error: 'database failure'});
        if(!review) return res.status(404).json({error: 'review not found'});
        if(req.body.contents)
            review.content = req.body.contents;
        if(req.body.phyAttr)
            review.phyAttr = req.body.phyAttr;
        if(req.body.rating)
            review.rating = req.body.rating;

        review.save(function(err){
            if(err) res.status(500).json({error: 'failed to review update'});
            res.status(200).json({"success" : true});
        });
    });
});


router.delete('/:reviewId', (req, res) => {
    const reviewId = req.params.reviewId;
    Review.remove({reviewId : reviewId},(err, output)=>{
        if(err) return res.status(500).json({error: 'database failure'});
        console.log(output);
        if(!output.n) return res.status(404).json({error: 'review not found'});
        res.status(200).json({"success" : true});
    });
});

router.put('/up/:reviewId', (req, res) => {
    const { reviewId } = req.params;
    Review.findOne({reviewId : reviewId},(err, review) => {
        console.log(review);
        if(err) return res.status(500).json({ error: 'database failure' });
        if(!review) return res.status(404).json({ error: 'user not found' });
        review.up = review.up+1;
        console.log(review.up);
        review.save(function(err){
            if(err) return res.status(400).json({error: 'failed to up'});
            res.status(200).json({success : true});
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


router.get('/users', (req, res) => {
    Review.find({email : req.user.email},(err, review)=>{
      if(err) return res.status(500).json({error: err});
      if(!review) return res.status(404).json({error: 'review not found'});
      //console.log(item);
      res.json(review);
    });
});

/*
    User.findOne({email : email})
        .then((user) =>{
            console.log(user);
            add_review.phyAttr = user.phyAttr;
            return add_review;
        })
        .then((add_review) =>{
            add_review.save();
            console.log(add_review);
        })
        .catch((err) => console.log(err));
    */


router.get('/today', (req, res) => {
    Item.find({"count" : {$gte:2},"rating" : {$gte:3}},{"itemId" : true})
    .then(items =>{
        var rand = Math.floor(Math.random() * items.length);
        //var randomItem = randomItem(items);
        console.log(items[rand].itemId);
        var randItem = items[rand].itemId;
        console.log(items);

    return Review.findOne({itemId : randItem});
    })
    .then((review) =>{
        res.json(review);
    })
    .catch(err => res.status(400).json(err));
});

router.get('/recent', (req, res) => {
    Review.find((err, reviews)=>{
        if(err) return res.status(500).json({error: err});
        if(!reviews) return res.status(404).json({error: 'review not found'});
        //console.log(item);
        res.json(reviews.sort({"public_date":-1}).slice(0,4));
    });
});

module.exports = router;