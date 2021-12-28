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

const loginCheck = require("../module/loginCheck");

router.get('/',loginCheck,(req,res)=> {
  res.status(200).json({
    message: "login success",
  });
});

const upload = require("../module/imgUpload");

router.post('/upload',upload.single('image'),(req,res) => {
  const file = req.file;
  console.log(file);
  res.status(200).json({
    message: "upload success!!",
  })
})
module.exports = router;
