import jwt from "jsonwebtoken";
import UserModel from "../model/userSchema.js";
const authMiddelwear = async (req,res,next)=>{  
    try{
        const token = req.headers["authorization"].split(" ")[1]; 
        console.log(token)
        const verifyToken = jwt.verify(token,"mom");
        const verifyuserdata = await UserModel.findOne({email:verifyToken.email})
        const verifyuserId = verifyuserdata._id
        console.log("verifyId",verifyuserId);
        req.verifyuserId = verifyuserId
        req.userData = verifyuserdata;  
        // console.log("verifyId",verifyuserId);
        // console.log("verify user data",req.userData);
        next();
    }catch(err){
        console.log(err.message);
        res.status(401).json({
            status: 401,
            message: "Unauthorized",
            data: "null"
        })
    }
}

export default authMiddelwear