const { StatusCodes } = require("http-status-codes");
const userSchema=require("../model/user");
const {badRequest,notFound}=require("../errors/index");

const login=async(req,res)=>{
    const {email,password}=req.body;
    if(!email||!password){
        throw new badRequest("email or password is not provided");
    }

    const user=await userSchema.findOne({email});
    if(!user){
        throw new notFound(`user with email:${email} does not exist`);
    }
    
    const checkPassword=await user.verifyPassword(password);
    if(!checkPassword){
        throw new badRequest(`The password: ${password} provided is incorrect`);
    };
    res.status(StatusCodes.OK).json({name:user.name,token:user.generateToken()});
}

const register=async(req,res)=>{
    const {body:{email,name}}=req;
    if(!name){
        throw new badRequest("Provide value in Name field");
    }
    const user=await userSchema.create(req.body);
    const token=user.generateToken();
    res.status(StatusCodes.CREATED).json({name:user.name,token});
}

module.exports={login,register};