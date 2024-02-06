import multer from "multer";

const storage = multer.diskStorage({
    destination:"./uploads",
    filename:(req,file,cb)=>{
        cb(null,`${new Date().getTime()}-${file.originalname}`)
    }
});

const upload = multer({
    storage:storage
})

export default upload;

//  import multer from "multer";

// const storage = multer.diskStorage({
//   destination: "./uploads/",
//   filename: function (req, file, cb) {
//     cb(null, `${new Date().getTime()}-${file.originalname}`);
//   },
// });

// const upload = multer({
//   storage: storage,
// });
// export default upload;
