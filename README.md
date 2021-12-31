# node-express
1. express 설치
2. npm i express-generator : express 패키지 설치
3. npm i nodemon : 템플릿 자동적용 패키지
4. express --ejs 프로젝트이름  : ejs템플릿을가진 프로젝트 생성
5. 프로젝트로 이동 후 npm i : init
6. 서버 실행 : npm start or node ./bin/www
7. nodemon 이용 : nodemon ./bin/www

# Routing
1. routes/index.js 에서 작업
2. bin/www : 포트 값 저장

# http method
1. Create : POST -body 에 데이터가 담김
2. Read : GET - queryString에서 데이터 이동
3. Update : PUT
4. Delete : DELETE
# middleware
1. 응답 요청 과정에서 로직을 끼워넣기위한 함수
2. use.app((req,res,next)=>{})

# multer
1. 파일 업로드할 때 유용한 패키지
2. upload.single("image");
    * upload : upload에저장
    * single : 파일 한개 업로드, image라는 FormData 전송
3. npm i multer
4. req.file : 업로드 된 파일
5. req.body : 나머지 요청 데이터
6. diskStorage, dest

# EJS (Embedded Javascript Template)
1. 템플릿엔진
2. <% Javascript %> : html에 보이지 않게 js 문법 사용
3. <%= val %> : html에 js 보여짐
4. <% include 경로 %>
```js
const express = require("express");
const router = express.Router();

router.get("/ejs", (req, res) => {
    res.render("template",{data: "test data"});// template.ejs
});

module.exports = router; // app.js 연결
```

# express-session 패키지
1. npm i express-session
2. 저장이 필요한 정보를 session에 저장하여 연결상태를 유지하는 기능

```js
const session = require("express-session");

app.use(session({
  secret: "frist project", // session 암호를 위한 값
  resave: false, // session을 변경하지 않아도 저장될지를 정하는 값
  saveUninitialized: true // session이 저장되기전에 이를 초기화
}))
```

3. 미니 로그인 로그아웃 구현
```js
var express = require('express');
var router = express.Router();

const userInfo = {
  lee :{
    password: "123123"
  },
  kim : {
    password: "456456"
  },
};

router.get('/',(req,res)=> {
  const session = req.session;
  res.render('index',{
    username: session.username,
  });
})

router.get('/login/:username/:password', (req,res)=> {
  const session = req.session;
  const {username, password} = req.params;
  if(!userInfo[username]){
    res.status(400).json({
      message:"user not found",
    });
  } 
  if (userInfo[username]["password"]===password) {
    session.username= username;
    res.status(200).json({
      message: "user login!!",
    });
  } else {
    res.status(400).json({
      message: "user pw incorrect!!",
    })
  }
})

router.get('/logout',(req,res)=>{
  const session = req.session;
  if(session.username) {
    console.log(session.username);
    session.destroy((err)=> {
      if(err) {
        console.log(err);
      }else {
        res.redirect('/users');
      }
    })
  } else {
    res.redirect('/users');
  }
})


module.exports = router;
```