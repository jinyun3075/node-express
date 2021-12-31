var express = require('express');
var router = express.Router();

// /* GET home page. */

// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


// router.post('/main',(req,res)=> {
//   res.json({
//     message:"mainsuccess!!",
//   });
// })

// router.post('/main',(req, res)=> {
//   const data = req.body.data;
//   // res.send("문자열이 응답됩니다!!");
//   // res.json({
//   //   message: "json 응답",
//   // })
//   res.render("index");
// });

// http 메소드

// Get method
// router.get('/read',(req,res)=>{
//   res.status(200).json({
//     message: "reade sucess",
//   })
// })

// Post method
// let arr=[];

// router.post('/create', (req,res)=> {
//   const {data} = req.body;
//   arr.push(data);
//   res.status(200).json({
//     message:"create success",
//     result: arr,
//   })
// })

// // Put Method
// //update/0
// router.put('/update/:id', (req,res)=> {
//   const {id} = req.params;
//   const {data} =req.body;
//   arr[id] =data;
//   res.status(200).json({
//     message: "update success",
//     result: arr,
//   })
// })

// //Delete Method
// router.delete("/delete/:id",(req,res)=>{
//   const{id} = req.params;
//   arr.splice(id,1);
//   res.status(200).json({
//     message: "delete success",
//     result: arr,
//   })
// })

//  이미지 업로드 % 로그인체크

// const loginCheck = require("../module/loginCheck");

// router.get('/',loginCheck,(req,res)=> {
//   res.status(200).json({
//     message: "login success",
//   });
// });

// const upload = require("../module/imgUpload");

// router.post('/upload',upload.single('image'),(req,res) => {
//   const file = req.file;
//   console.log(file);
//   res.status(200).json({
//     message: "upload success!!",
//   })
// })

// const postModel = require("../model/post");

// router.post('/',async (req,res)=> {
//   const {title,content} = req.body;
//   const post = new postModel({
//     title: title,
//     content: content,
//   });
//   try {
//     const result = await post.save();
//     res.status(200).json({
//       message:"upload success!!",
//       data: result,
//     });
//   } catch(error) {
//     res.status(500).json({
//       message: error,
//     });
//   }
// });

// router.get('/',async (req,res) => {
//   try {
//     const result = await postModel.find({}); //  중괄호에 찾을 목록 입력가능 예){title:"first"}
//     res.status(200).json({
//       message: "read success!!",
//       data : result,
//     });
//   } catch(error) {
//     res.status(500).json({
//       message: error,
//     });
//   }
// })

// router.get('/:id',async (req,res)=> {
//   const { id } = req.params;
//   try {
//     const result = await postModel.findById(id);
//     res.status(200).json({
//       message:"detail success!!",
//       data: result,
//     });
//   } catch (error){
//     res.status(500).json({
//       message: error,
//     })
//   }
// })

// router.put('/:id',async (req,res)=> {
//   const {id}=req.params;
//   const {title, content} = req.body;
//   try {
//     const result = await postModel.findByIdAndUpdate(id,{
//       title: title,
//       content : content,
//     },{
//       new:true, // 변경된 사항으로 저장하는 옵션
//     });
//     res.status(200).json({
//       message: "update success!!",
//       data: result,
//     })
//   } catch(error) {
//     res.status(500).json({
//       message: error,
//     })
//   }
// })

// router.delete('/:id',async (req,res)=> {
//   const {id} = req.params;
//   try {
//     const result =await postModel.findByIdAndDelete(id);
//     res.status(200).json({
//       message: "delete success!!",
//       data: result
//     })
//   } catch(error) {
//     res.status(500).json({
//       message:error,
//     })
//   }
// })

module.exports = router;
