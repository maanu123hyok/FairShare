const jwt  = require("jsonwebtoken");
const { unauth } = require("../errors/index");
const userSchema=require("../model/user");

const authentication=async(req,res,next)=>{
    const authorization=req.headers.authorization||req.get("Authorization");
    if(!authorization || !authorization.startsWith("Bearer ")){
        throw new unauth("authorization invalid");
    }
    const token=authorization.split(" ")[1];
    try{
        const payload=await jwt.verify(token,process.env.JWT_SECRET); 
        req.user=await userSchema.findOne({email:payload.email}).select("-password");
        next();
    }
    catch(err){
        throw new unauth("authorization invalid");
    }
}

module.exports=authentication;