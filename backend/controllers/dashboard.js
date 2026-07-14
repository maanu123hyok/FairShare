const totalAmountToPay=()=>{}
const totalAmountToReceive=()=>{}
const groupWithAmountDue=()=>{}
const groupWithAmountDueToReceive=()=>{}
const groupInWhichPaid=()=>{}
const groupInWhichReceived=()=>{}
const { StatusCodes } = require("http-status-codes")
const userSchema=require("../model/user");

const dashboardInfo=async(req,res)=>{
    const user=await userSchema.findOne({_id:req.user.id}).select("email -_id");
    res.status(StatusCodes.OK).json(user);
}

module.exports={dashboardInfo};