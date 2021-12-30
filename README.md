# node-express
1. express 설치
2. npm i express-generator : express 설치
3. npm i nodemon : 템플릿 자동적용
4. express --ejs 프로젝트이름  : ejs템플릿을가진 프로젝트 생성
5. 프로젝트로 이동 후 npm i : init
6. 서버 실행 : npm start or node ./bin/www
7. nodemon 이용 : nodemon ./bin/www

# Routing
1. routes/index.js 에서 작업
2. bin/www : 포트 값 저장

# http method

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
2. <% Javascript %> : js 문법 사용
3. <%= val %> : render에서 받아오는 변수 사용
```js
const express = require("express");
const router = express.Router();

router.get("/ejs", (req, res) => {
    res.render("template",{data: "test data"});
});

module.exports = router; // app.js 연결
```