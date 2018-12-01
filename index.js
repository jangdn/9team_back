const express = require('express');
const cors = require('cors');
const http = require('http');
const logger = require('morgan');
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
const PORT = 8080;

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

mongoose.connect('mongodb://localhost/SEdb');

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

app.post('/api/signup', (req,res) => {
  User.findOne({email : req.body.email},(err, user) => {
    console.log(user);
    if(err) return res.status(500).json({ error: 'database failure' });
    if(user) return res.status(404).json({ error: 'email is existed already' });
    //ITEM
    var add_user = new User();
    add_user.password = req.body.password;
    add_user.email = req.body.email;
    
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

const server = http.createServer(app);
server.listen(PORT);

