const { StatusCodes } = require("http-status-codes");
const { badRequest, notFound,unauth} = require("../errors/index");
const groupSchema=require("../model/group");
const userSchema=require("../model/user");

const checkingGroupMembers=async(grpMembers)=>{
    // finding members' email
    const member=await userSchema.find({email:{$in:grpMembers}}).select("email");
    const foundEmails=member.map(el=>el.email);
    const nonMembers=grpMembers.filter(email=> !foundEmails.includes(email));

    // throwing error if user tried to add any email that does not exist in db
    if(nonMembers.length>0){
        throw new notFound(`user with email id: ${nonMembers} are not found`);
    }

    // changing req.user.grpMembers(the original variable) with new ids to be added
   grpMembers=member.map(el=>el._id);
   return grpMembers;
}

const createGroup=async(req,res)=>{
    let {body:{grpName,grpDescription,grpMembers}}=req;
    req.body.createdBy=req.user.id;

    if(!grpName||!grpDescription||!grpMembers){
        throw new badRequest("Provide all the three:grpName,grpDescription,grpMembers");
    }

    // replacing grpMembers from emails entered with their ids and adding the user who created too
    req.body.grpMembers=await checkingGroupMembers(grpMembers);
    if(!req.body.grpMembers.some(el=>el.toString()==req.body.createdBy)){
        req.body.grpMembers.push(req.user.id);
    }
    
    // group created
    const group=(await groupSchema.create(req.body));
    res.status(StatusCodes.CREATED).json({group});
}

const getGroups=async(req,res)=>{
    const groups=await groupSchema.find({grpMembers:req.user._id}).populate("grpMembers","name email");
    res.status(StatusCodes.OK).json(groups);
}


const getGroup=async(req,res)=>{
    const {params:{id:groupId}}=req;
    const group=await groupSchema.findOne({_id:groupId,grpMembers:req.user._id}).populate("grpMembers","name email");
    if(!group){
        throw new unauth("You are either accessing an invalid group or a group that you are not a part of");
    }
    res.status(StatusCodes.OK).json({group});
}


const updateGroup=async(req,res)=>{
    let {params:{id:groupId},body:{grpMembers}}=req;

    req.body.grpMembers=await checkingGroupMembers(grpMembers);

    // finding id of the creator
    const createdByUserId=await groupSchema.findOne({_id:groupId,grpMembers:req.user._id}).select("createdBy -_id");
    const updatedUserId=req.user.id;
     // adding id of the creator if not included
    if(!req.body.grpMembers.includes(createdByUserId))
    {
        req.body.grpMembers.push(createdByUserId.createdBy);
     }
      // adding id of the user who updated if not included
     if(!req.body.grpMembers.includes(updatedUserId)){
        req.body.grpMembers.push(updatedUserId);
     }
    // updating group name,description,members and description
    const group=await groupSchema.findOneAndUpdate({_id:groupId,grpMembers:req.user._id},req.body,{
        returnDocument:"after",
        runValidators:true,
    }).populate("grpMembers","name email");

    if(!group){
        throw new unauth("You are either accessing an invalid group or a group that you are not a part of");
    }
    res.status(StatusCodes.OK).json(group);
}

const addMembers=async(req,res)=>{
    const {params:{id:groupId},body:{grpMembers}}=req;

    // changing req.user.grpMemebers(the original variable) with new ids to be added
    const verifiedNewMemberIds=await checkingGroupMembers(grpMembers);
    const group=await groupSchema.findOneAndUpdate({_id:groupId,grpMembers:req.user.id},{$addToSet:{grpMembers:{$each:verifiedNewMemberIds}}},{
        returnDocument:"after",
        runValidators:true
    }).populate("grpMembers","name email");

    res.status(StatusCodes.OK).json(group);
}

const removeMembers=async(req,res)=>{
    let {params:{id:groupId},body:{grpMembers}}=req;
    let verifiedMemberIdsToBeRemoved=await checkingGroupMembers(grpMembers);

    const createdByUserId=await groupSchema.findOne({_id:groupId,grpMembers:req.user._id}).select("createdBy -_id");
    const createdByUserIdToString=createdByUserId.createdBy.toString();

    verifiedMemberIdsToBeRemoved=verifiedMemberIdsToBeRemoved.filter(el=>el.toString()!=createdByUserIdToString);
    const group =await groupSchema.findOneAndUpdate({_id:groupId,grpMembers:req.user._id},{$pull:{grpMembers:{$in:verifiedMemberIdsToBeRemoved}}},{
        returnDocument:"after",
    }).populate("grpMembers","name email");
    res.status(StatusCodes.OK).json(group);
}

const deleteGroup=async(req,res)=>{
    const {params:{id:groupId}}=req;
    const group=await groupSchema.findOneAndDelete({_id:groupId,grpMembers:req.user._id}).populate("grpMembers","name email");
    if(!group){
        throw new unauth("You are either accessing an invalid group or a group that you are not a part of");
    }
    res.status(StatusCodes.OK).json(group);
}
module.exports={getGroups,createGroup,getGroup,updateGroup,deleteGroup,addMembers,removeMembers};