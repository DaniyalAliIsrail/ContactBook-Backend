// import multer from "multer";

// const storage = multer.diskStorage({
//   destination: "./uploads/",
//   filename: function (req, file, cb)  {
//     cb(null, `${new Date().getTime()}-${file.originalname}`);
//   },
// });

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 10 * 1024 * 1024 },
// });

// export default upload;

import multer from 'multer';

// Use memory storage to keep files in memory (not saving them locally)
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
});

export default upload;
