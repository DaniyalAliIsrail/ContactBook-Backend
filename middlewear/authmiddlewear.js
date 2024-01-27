import jwt from "jsonwebtoken";
const authMiddelwear = async (req,res,next)=>{  
    try{
        if(req.header["authorization"]){
            const token = req.header["authorization"].split(" ");
            const isVerify = jwt.verify(token[1],"mom");
            // const userDb = await UserModel.findOne({email:isVerify.email})
            if(isVerify){
                next()
            }else{
                res.status(401).json({
                    message:"unauthorized user"
                })
    
        }
    }
}
catch{
    res.status(401).json({
        message:"unauthorized"
    })
}
}

export default authMiddelwear