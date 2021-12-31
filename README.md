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

# NoSQL(not only Structure Query Language) - MongoDB
1. SQL은 보통 스키마를 만들어 규칙과 일관성있게 데이터를 관리할 수 있다.
2. NoSQL은 유연하고 빠른속도로 데이터를 관리할 수 있다.
3. document Oriented (문서 지향)
4. 예) collection = Document(Data)+Document(Data)+Document(Data)
5. json 타입으로 저장
6. Mongodb camppas : GUI로 관리 가능

# ODM (Object Doucmnet Mapping) - mongoose 패키지
1. npm i mongoose
2. 객체와 문서를 1:1 매핑
3. mongoose와 atals 연결
* pakage bin/www
``` js
const dbconfig = require("...");

const mongoose = require('mongoose');
const db = mongoose.connection;
db.on("error", console.error); // 애러발생시
db.once("open",()=> {     // 실행시
  console.log("connected to mongodb server!!");
})
mongoose.connect( // atlas / mongoose 연결
  `mongodb+srv://jin:${dbconfig.pw}@first-project.0dfpr.mongodb.net/${dbconfig.name}?retryWrites=true&w=majority`
  ,{userNewUrlParser: true, useUnifiedTopology:true} // 경고문자 방지용 옵션
)
```

# monggose
1. Schema 사용예
``` js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title : String,
    content : String,
    create_data: {type: Date, default: new Date()},
});

module.exports = mongoose.model("post", postSchema);
```

2. CRUD 서버 만들기
```js
const postModel = require("../model/post");

//CREATE
router.post('/',async (req,res)=> {
  const {title,content} = req.body;
  const post = new postModel({
    title: title,
    content: content,
  });
  try {
    const result = await post.save();
    res.status(200).json({
      message:"upload success!!",
      data: result,
    });
  } catch(error) {
    res.status(500).json({
      message: error,
    });
  }
});

//READE
router.get('/',async (req,res) => {
  try {
    const result = await postModel.find({}); //  중괄호에 찾을 목록 입력가능 예){title:"first"}
    res.status(200).json({
      message: "read success!!",
      data : result,
    });
  } catch(error) {
    res.status(500).json({
      message: error,
    });
  }
})

router.get('/:id',async (req,res)=> {
  const { id } = req.params;
  try {
    const result = await postModel.findById(id);
    res.status(200).json({
      message:"detail success!!",
      data: result,
    });
  } catch (error){
    res.status(500).json({
      message: error,
    })
  }
})

//UPDATE
router.put('/:id',async (req,res)=> {
  const {id}=req.params;
  const {title, content} = req.body;
  try {
    const result = await postModel.findByIdAndUpdate(id,{
      title: title,
      content : content,
    },{
      new:true, // 변경된 사항으로 저장하는 옵션
    });
    res.status(200).json({
      message: "update success!!",
      data: result,
    })
  } catch(error) {
    res.status(500).json({
      message: error,
    })
  }
})

//DELETE
router.delete('/:id',async (req,res)=> {
  const {id} = req.params;
  try {
    const result =await postModel.findByIdAndDelete(id);
    res.status(200).json({
      message: "delete success!!",
      data: result
    })
  } catch(error) {
    res.status(500).json({
      message:error,
    })
  }
})
```