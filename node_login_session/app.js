const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();

const loginRouter = require('./routes/login');
const loginProcessRouter = require('./routes/loginprocess'); 

const app = express();

// 이미지, css, html 등의 정적 파일 경로 
app.use('/static', express.static(__dirname + '/public/'));
app.set('port', process.env.PORT || 4000);

 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 세션과 쿠키 관리를 위한 미들웨어 
app.use(cookieParser(process.env.COOKIE_SECRET)); 
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
  name: 'session-cookie',
}));

app.use('/login', loginRouter);
app.use('/loginprocess', loginProcessRouter); 

app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});

app.set('view engine','ejs');
app.set('views','./views_ejs');

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});