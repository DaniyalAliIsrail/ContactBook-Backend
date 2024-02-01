import CrudModel from "../model/crudSchema.js";
import UserModel from "../model/userSchema.js";
import fileUploader from "../utils/fileUploader.js";

const dashboardValidate = async (req, res) => {
  try {
    const userValid = await UserModel.findOne({ _id: req.verifyuserId });
    res.status(200).json({ status: 200, userValid });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: 400, message: "Internal server error" });
  }
};

const postController = async (req, res) => {
  try {
    const image = req.files[0].path;

    const { name, email, contact } = req.body;
    if (!name || !email || !contact) {
      return res.status(400).json({
        status: 400,
        message: "Please fill all the fields",
        data: null,
      });
    }

    try {
      const imageurl = await fileUploader(image);
      const times = new Date().toLocaleString('en-US', {
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      
      const objToSend = {
        name: name,
        email: email,
        contact: contact,
        imageUrl: imageurl.secure_url,
        verifyUserId: req.verifyuserId,
        times:times
      };
      // console.log(objToSend);
      const userPost = new CrudModel(objToSend);
      const CrudData = await userPost.save();

      res.status(200).json({
        status: 200,
        message: "Post successfully",
        data: CrudData,
      });
    } catch (uploadError) {
      console.error("Error in file upload:", uploadError);
      res.status(400).json({
        status: 400,
        message: "Internal server error during file upload",
        data: null,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 400,
      message: "Invalid message",
      data: null,
    });
  }
};

const allPostController = async (req, res) => {
  try {
    const allPost = await CrudModel.find({ verifyUserId: req.verifyuserId });
    res
      .status(200)
      .json({
        status: 200,
        message: "Get All post successfully",
        Data: allPost,
      });
  } catch (err) {
    // console.log(err);
    res.status(400).json({ status: 400, message: "No Post Find" });
  }
};

const delPostController = async (req, res) => {
  try {
    const id = req.params.id;
    const delPost = await CrudModel.findByIdAndDelete({ _id: id });
    res
      .status(200)
      .json({ status: 200, message: "Delete Post successfully", delPost });
  } catch (err) {
    // console.log("delposterr",err);
    res.status(400).json({
      status: 400,
      message: "Internal server error",
      data: null,
    });
  }
};

const updatePostController = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email, contact } = req.body;

    if (!name || !email || !contact) {
      return res.status(400).json({
        status: 400,
        message: "please fill all the filed",
        data: null,
      });
    }
    const updateFields = { name, email, contact };
    const updatePost = await CrudModel.findByIdAndUpdate({ _id: id }, updateFields ,{new:true});
    return res.status(200).json({
        status:200,
        message:"update post controller",
        data:updatePost
    })
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 400,
      message: "Internal server error",
      data: null,
    });
  }
};

// import multer from 'multer';
// import cloudinary from 'cloudinary';
// import { v2 as cloudinaryV2 } from 'cloudinary';
// import fs from 'fs';

// // Assuming you have configured Cloudinary before using it.
// // Make sure to set up the Cloudinary configuration with your credentials.

// // Multer configuration for image upload
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// const updatePostController = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const { name, email, contact } = req.body;
    
//     // Assuming you have a field in the schema named imageUrl to store the Cloudinary URL
//     let imageUrl;

//     // Check if a new image is being uploaded
//     if (req.file) {
//       // Upload the image to Cloudinary
//       const result = await cloudinaryV2.uploader.upload(req.file.buffer.toString('base64'));
//       imageUrl = result.secure_url;
//     }

//     // Update fields including the imageUrl
//     const updateFields = { name, email, contact, imageUrl };

//     // Find and update the document
//     const updatePost = await CrudModel.findByIdAndUpdate({ _id: id }, updateFields, { new: true });

//     if (!updatePost) {
//       return res.status(404).json({
//         status: 404,
//         message: "Post not found",
//         data: null,
//       });
//     }

//     // If a new image was uploaded, delete the old image from Cloudinary
//     if (imageUrl && updatePost.imageUrl) {
//       const publicId = updatePost.imageUrl.split('/').pop().split('.')[0];
//       cloudinaryV2.uploader.destroy(publicId);
//     }

//     return res.status(200).json({
//       status: 200,
//       message: "Update successful",
//       data: updatePost,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       status: 500,
//       message: "Internal server error",
//       data: null,
//     });
//   }
// };

// export default upload.single('image')(updatePostController);



export {
  dashboardValidate,
  postController,
  allPostController,
  delPostController,
  updatePostController
};
