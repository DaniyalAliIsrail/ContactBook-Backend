// // import multer from "multer";

// // const storage = multer.diskStorage({
// //     destination:"./uploads",
// //     filename:(req,file,cb)=>{
// //         cb(null,`${new Date().getTime()}-${file.originalname}`)
// //     }
// // });

// // const upload = multer({
// //     storage:storage
// // })
// // export default upload;

// //  import multer from "multer";

// // const storage = multer.diskStorage({
// //   destination: "./uploads/",
// //   filename: function (req, file, cb) =>{
// //     cb(null, `${new Date().getTime()}-${file.originalname}`);
// //   }
// // });

// // const upload = multer({
// //   storage: storage,
// // });
// // export default upload;


// import multer from "multer";
// import path from "path";

// // Define storage for uploaded files
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     // Specify the directory where uploaded files will be stored
//     cb(null, "./uploads/");
//   },
//   filename: (req, file, cb) => {
//     // Create a unique filename for the uploaded file
//     const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
//     cb(null, uniqueSuffix);
//   },
// });

// // Configure multer with the storage engine
// const upload = multer({
//   storage, // Shorthand for storage: storage
//   limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
// });

// // Export the configured upload middleware
// export default upload;


// import multer from "multer";

// const storage = multer.diskStorage({
//   destination: "./uploads/",
//   filename: function (req, file, cb)  {
//     cb(null, `${new Date().getTime()}-${file.originalname}`);
//   },
// });
// const upload = multer({
//   storage: storage,
// });
// export default upload;

// multerConfig.js
import multer from "multer";

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb)  {
    cb(null, `${new Date().getTime()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
});

export default upload;
