const express = require('express');
const cors = require('cors');
const http = require('http');
const logger = require('morgan');
const history = require('connect-history-api-fallback');
const categories = require('./routes/categories')
const items = require('./routes/items')
const users = require('./routes/users')
const reviews = require('./routes/reviews')
//const passportConfig = require('./config/passport');
var passport = require('passport');
var helmet = require('helmet');
var session = require('express-session');
const mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var LocalStrategy = require('passport-local').Strategy
var User = require('./routes/model/model_users');

const app = express();
const PORT = 80;

app.set('port', PORT);
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/*
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static('views'));
*/


app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ success: false });
});


var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    console.log("Connected to mongodb server");
});

mongoose.connect('mongodb://otjalan.ml/SEdb');

// var store = new MongoDBStore({
//   url: 'mongodb://localhost/SEdb',
//   collection: 'mySessions',
// });

// store.on('error', function(err){
//   assert.ifError(err);
//   assert.ok(false);
// });

app.use(session({
  name : 'session',
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie:{maxAge : 3600000, httpOnly : true},
  //store : store,
}));

app.use(helmet.hsts({
maxAge:10886400000,
includeSubdomains : true,
}));


app.use(passport.initialize());
app.use(passport.session()); //로그인 세션 유지

passport.serializeUser(function(user, done) {
  console.log("serialize");
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log("deserialize");
  User.findById(id , function(err, user) {
      done(null, user);
  });
});

app.get('/api/session', ensureAuthenticated, function(req, res) {
  // deserializeUser에서 추가로 저장한 정보까지 전달 받음
  let userInfo = req.user;
  console.log(userInfo);
  return res.json(req.user);
});

app.get('/api/login', ensureAuthenticated, function(req, res) {
  // deserializeUser에서 추가로 저장한 정보까지 전달 받음
  if(req.user)
    return res.status(200).json({succecs : true});
  else
    return res.status(400).json({message:"not login"});
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { // 현재 session이 유효한 세션인가?
      // 유효 하므로 다음으로
      return next();
  }
  // 유효하지 않은 경우
  res.status(401).json({message:"정상적인 접근이 아닙니다."});
}

passport.use('local-login', new LocalStrategy({
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true,
  },
  function(req, email, password, done){
    User.findOne({ 'email' : email }, function(err, user) {
      console.log(req.body);
      if (err) {
        console.log("그냥 에러에요!");
        return done(err);
      }
      if (!user) {
        console.log("user가 없어요!");
        return done(null, false);
      }
      if (user.password != password){
        console.log("패스워드가 틀렸어요!");
        return done(null, false);
      }
      return done(null, user);
    });
  })
);


app.post('/api/login', 
    function (req,res,next){
        next();
    }, passport.authenticate('local-login'),
    function (req, res){
      if(req.user)
        return res.status(200).json({success : true});
      else
        return res.status(400).json(err);
    }
  );

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

app.post('/api/signup', (req,res) => {
  User.findOne({email : req.body.email},(err, user) => {
    console.log(user);
    if(err) return res.status(500).json({ error: 'database failure' });
    if(user) return res.status(404).json({ error: 'email is existed already' });
    //ITEM
    var add_user = new User();
    add_user.password = req.body.password;
    add_user.email = req.body.email;
    add_user.nickname = randomItem(firNick) + randomItem(secNick);

    console.log(add_user);
    add_user.save()
      .then(result => res.status(200).json({ success: true }))
      .catch(err => console.log(err));
    });
});

app.use('/api/categories', categories);
app.use('/api/items', items);
app.use('/api/users', users);
app.use('/api/reviews', reviews);


app.use(express.static('public'));
app.use(history())
app.use(express.static('public'));

const server = http.createServer(app);
server.listen(PORT);

