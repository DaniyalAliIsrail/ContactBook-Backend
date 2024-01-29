import jwt from "jsonwebtoken";
import UserModel from "../model/userSchema.js";
const authMiddelwear = async (req,res,next)=>{  
    try{
        const token = req.headers["authorization"].split(" ")[1]; 
        const verifyToken = jwt.verify(token,"mom");
        // console.log("verifyToken",verifyToken);

        const verifyuserdata = await UserModel.findOne({email:verifyToken.email})
        const verifyuserId = verifyuserdata._id
        req.verifyuserId = verifyuserId
        console.log("verifyId",verifyuserId);
        // req.userData = verifyuserdata;  
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