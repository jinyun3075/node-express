const multer = require("multer");
const storage = multer.diskStorage({
    destination : (req,file,cd)=> { // 목적지
        cd(null, 'public/images/')
    },
    filename: (req,file,cd)=> {
        cd(null,file.originalname) // 파일 이름
    }
})
// const upload = multer({dest:"uploads/"})
const upload = multer({storage:storage});

module.exports = upload;