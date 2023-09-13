const express = require('express');
const path = require('path');
const router = express.Router();

// POST 방식 요청   /loginProcess 라우터  
router.post('/', (req, res) => {  
  let  id  = req.body['id'] // POST 방식 요청이면  req.body[".."] 로 
  let  pw  = req.body['pw'] // POST 방식 요청이면  req.body[".."] 로 
 
  console.log("req.query=", req.query, "req.body=", req.body, id)
  
  if (id=="kim" & pw=="1234"){ //로그인 성공
    // res.sendFile(path.join(__dirname, 'main.html'));
    if(!req.session.loginuser){
      req.session.loginuser = id;
    }

    // res.send(`로그인 유저 : ${req.session.loginuser} 님 안녕하세요` );
    res.render('main',{userid:req.session.loginuser});
    } else {
	      res.send("로그인 실패. 다시 로그인하세요.")
    }
}); 
 

router.get('/', (req, res) => {
     res.sendFile(path.join(__dirname, 'login.html'));  
});

module.exports = router;