const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();

const app = express();

// 이미지, css, html 등의 정적 파일 경로 
app.use('/static', express.static(__dirname + '/public/'));
app.set('port', process.env.PORT || 4000);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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

 
app.set('view engine','ejs');
app.set('views','./views_ejs');

app.get('/order', (req, res) => {  //req.session.total
   
  res.render('order',{total:0});
});

 

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});
