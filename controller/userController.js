import CrudModel from "../model/crudSchema.js";
import UserModel from "../model/userSchema.js";
import fileUploader from "../utils/fileUploader.js";

const dashboardValidate = async (req, res) => {
// console.log(req.verifyUserId)
  const userValid = await UserModel.findOne({ _id: req.verifyuserId });
  res.status(200).json({ status: 200, userValid });
};

const postController = async (req, res) => {
    try {
        const image = req.files[0].path;

        const { name, email, contact } = req.body;
        if (!name || !email || !contact) {
            return res.status(400).json({
                status: 400,
                message: 'Please fill all the fields',
                data: null,
            });
        }

        try {
            const imageurl = await fileUploader(image);
            const objToSend = {
                name: name,
                email: email,
                contact: contact,
                imageUrl: imageurl.secure_url,
                verifyUserId:req.verifyuserId
            };
            // console.log(objToSend);
            const userPost = new CrudModel(objToSend);
            const CrudData = await userPost.save();

            res.status(200).json({
                status: 200,
                message: 'Post successfully',
                data: CrudData,
            });
        } catch (uploadError) {
            console.error('Error in file upload:', uploadError);
            res.status(400).json({
                status: 400,
                message: 'Internal server error during file upload',
                data: null,
            });
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: 400,
            message: 'Invalid message',
            data: null,
        });
    }
};

export { dashboardValidate, postController };
