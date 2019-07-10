var express = require('express')
  , http = require('http');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const path = require('path');


const app = express();

// Passport config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').MongoURI;

// 모듈로 분리한 설정 파일 불러오기
var config = require('./config/config');

// 모듈로 분리한 데이터베이스 파일 불러오기
var database = require('./database/database');

// 모듈로 분리한 라우팅 파일 불러오기
var route_loader = require('./routes/route_loader');

// // Connect to Mongo
// mongoose.connect(db, {useNewUrlParser: true})
//   .then(() => console.log('mongoDB Connected...'))
//   .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine','ejs');
app.set('views', __dirname + '/views');
console.log('뷰 엔진이 ejs로 설정되었습니다.');
console.log('config.server_port : %d', config.server_port);
app.set('port', process.env.PORT || 3000);
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/'));
app.use("/css",express.static(__dirname + "/css"));
app.use("/js",express.static(__dirname + "/js"));

app.use(cookieParser('my key'));

app.use(session({
	secret:'my key',
	resave:false,
	saveUninitialized:false
}));

// Bodyparser
app.use(express.urlencoded({ extended: false }));

// Express Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

var router = express.Router();
route_loader.init(app, router);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global Vars
app.use((req,res,next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// Routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));

// 시작된 서버 객체를 리턴
var server = http.createServer(app).listen(app.get('port'), function(){
	console.log('서버가 시작되었습니다. 포트 : ' + app.get('port'));
	database.init(app, config);	// 데이터베이스 초기화
});