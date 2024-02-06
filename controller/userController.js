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

// const postController = async (req, res) => {
//   try {
//     const image = req.files[0].path;

//     const imageFile = await fileUploader(image);

//     console.log(image);

//     // return
//     const { name, email, contact } = req.body;
//     if (!name || !email || !contact) {
//       return res.status(400).json({
//         status: 400,
//         message: "Please fill all the fields",
//         data: null,
//       });
//     }

//     try {
//       const imageurl = await fileUploader(image);
//       const times = new Date().toLocaleString('en-US', {
//         day: 'numeric',
//         year: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit',
//         second: '2-digit'
//       });

//       const objToSend = {
//         name: name,
//         email: email,
//         contact: contact,
//         imageUrl: imageFile.secure_url,
//         verifyUserId: req.verifyuserId,
//         times:times
//       };

//       // console.log(objToSend);

//       const userPost = new CrudModel(objToSend);
//       const CrudData = await userPost.save();

//       res.status(200).json({
//         status: 200,
//         message: "Post successfully",
//         data: CrudData,
//       });
//     } catch (uploadError) {
//       console.error("Error in file upload:", uploadError);
//       res.status(400).json({
//         status: 400,
//         message: "Internal server error during file upload",
//         data: null,
//       });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(400).json({
//       status: 400,
//       message: "Invalid message",
//       data: null,
//     });
//   }
// };



// const postController = async (req, res) => {
//   try {
//     bodyData = req.body;

//     const image = req.files[0].path;
//     //validation nhy lagana hay
//     const imageurl = await fileUploader(image);

//     console.log(image);
//     console.log(bodyData);

//     const { name, email, contact } = bodyData;
//     if (!name || !email || !contact) {
//       res.json({
//         status: false,
//         message: "Required Fields Are Missing!",
//         data: null,
//       });
//       return;
//     }
//     // return console.log(imageurl)
//     const objtosend = {
//       name: name,
//       email: email,
//       contact: contact,
//       imageUrl: imageurl.secure_url,
//       verifyUserId: req.verifyuserId,
//       times: times,
//     };
//     const crudOperation = new CrudModel(objtosend);
//     const CrudData = await crudOperation.save();
    
//     res.status(200).json({ status: 200,  data: CrudData});
//   } catch (error) {
//     res.send(error);
//   }
// };

const postController = async (req, res) => {
  try {
    bodyData = req.body;

    const image = req.files[0].path;
    // validation nhy lagana hay
    const imageurl = await fileUploader(image);

    console.log(image);
    console.log(bodyData);

    const { name, email, contact } = bodyData;
    if (!name || !email || !contact) {
      res.json({
        status: false,
        message: "Required Fields Are Missing!",
        data: null,
      });
      return;
    }

    // Define the 'times' variable (replace 0 with the actual value)
    const times = new Date().toLocaleString('en-US', {
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    const objtosend = {
      name: name,
      email: email,
      contact: contact,
      imageUrl: imageurl.secure_url,
      verifyUserId: req.verifyuserId,
      times: times,
    };

    const crudOperation = new CrudModel(objtosend);
    const CrudData = await crudOperation.save();

    res.status(200).json({ status: 200, data: CrudData });
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};


const allPostController = async (req, res) => {
  try {
    const allPost = await CrudModel.find({ verifyUserId: req.verifyuserId });
    res.status(200).json({
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
    const updatePost = await CrudModel.findByIdAndUpdate(
      { _id: id },
      updateFields,
      { new: true }
    );
    return res.status(200).json({
      status: 200,
      message: "update post controller",
      data: updatePost,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 400,
      message: "Internal server error",
      data: null,
    });
  }
};

const searchPostsController = async (req, res) => {
  try {
    const verifyUserId = req.verifyuserId;
    const { search } = req.query;

    if (!search) {
      return res.status(400).json({
        status: 400,
        message: "Search query parameter is required",
      });
    }

    const query = {
      verifyUserId,
      $or: [
        { name: { $regex: new RegExp(search, "i") } },

        { email: { $regex: new RegExp(search, "i") } },

        { contact: { $regex: new RegExp(search, "i") } },

        { times: { $regex: new RegExp(search, "i") } },

        { imageUrl: { $regex: new RegExp(search, "i") } },
      ],
    };

    const searchResults = await CrudModel.find(query);

    res.status(200).json({
      status: 200,
      message: "Search successful",
      data: searchResults,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 500, message: "Internal server error" });
  }
};

export {
  dashboardValidate,
  postController,
  allPostController,
  delPostController,
  updatePostController,
  searchPostsController,
}
