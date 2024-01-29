import UserModel from "../model/userSchema.js";

const dashboardValidate = async (req,res)=>{
    const userValid = await UserModel.findOne({_id:req.verifyuserId})
    console.log(userValid);
    res.status(200).json({status:200,userValid})
}

export default dashboardValidate