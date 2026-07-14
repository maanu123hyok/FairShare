const expenseSchema=require("../model/expense");
const userSchema=require("../model/user");
const groupSchema=require("../model/group");
const { badRequest, notFound, unauth } = require("../errors/index");
const { StatusCodes } = require("http-status-codes");

const checkingValidGroup=async(groupId)=>{
    const group=await groupSchema.findOne({_id:groupId});
    if(!group){
        throw new notFound("This group does not exist");
    }

    return group;
}

const checkingPayerExistsInDatabase=async(whoPaid)=>{
    const userWhoPaid=await userSchema.findOne({_id:whoPaid}).select("_id");
    if(!userWhoPaid){
        throw new notFound(`Cannot find user with email id as:${whoPaid}`);
    }
    return userWhoPaid;
}

const checkingGroupInUserPaid=async(groupId,userWhoPaid)=>{
    const groupInUserWhoPaid=await groupSchema.findOne({_id:groupId,grpMembers:userWhoPaid._id});
    if(!groupInUserWhoPaid){
        throw new notFound(`Cannot find user with email id as:${whoPaid} in the group`);
    }
    return groupInUserWhoPaid;
}

const checkingForWhomPaidExistsInDatabase=async(forWhomPaid)=>{
    const userForWhomPaid=await userSchema.findOne({_id:forWhomPaid}).select("_id");
    if(!userForWhomPaid){
        throw new notFound(`Cannot find user with email id as:${forWhomPaid}`);
    }
    return userForWhomPaid;
}

const checkingGroupInUserForWhomPaid=async(groupId,userForWhomPaid)=>{
    const groupUserForWhomPaid=await groupSchema.findOne({_id:groupId,grpMembers:userForWhomPaid._id});
    if(!groupUserForWhomPaid){
        throw new notFound(`Cannot find user with email id as:${forWhomPaid._id} in the group`);
    }

    return groupUserForWhomPaid;
}

const checkingErrorsInUpdate=async(groupId,expense,expName,amtPaid,amtReturned,whoPaid,forWhomPaid)=>{
    if(expName){
        const checkOldExpName=await expenseSchema.findOne({groupId,expName});
        if(checkOldExpName){
            throw new badRequest(`Expense with name ${expName} already exists`);
        }
    }

    if(amtPaid &&(amtPaid<=0 || amtPaid<=expense.amtReturned)){
        throw new badRequest(`Amount of Rs ${amtPaid} is not valid`);
    }
    if(amtReturned && (amtReturned<=0||amtReturned>=expense.amtPaid)){
        throw new badRequest(`Amount of Rs ${amtReturned} is not valid.Amount returned should be more than zero and less than amount paid`);
    }

    if(whoPaid && forWhomPaid && whoPaid===forWhomPaid){
        throw new badRequest(`The user who paid and the user for whom paid cannot be the same`);
    }
}


const createExpense=async(req,res)=>{
    const {params:{groupId},body:{amtPaid,whoPaid,forWhomPaid,amtReturned,expName}}=req;
    const group=await checkingValidGroup(groupId);
    req.body.groupId=groupId;
    if(amtPaid<=0){
        throw new badRequest(`Amount of Rs ${amtPaid} is not valid`);
    }
    if(amtReturned && (amtReturned<=0||amtReturned>=amtPaid)){
        throw new badRequest(`Amount of Rs ${amtReturned} is not valid.Amount returned should be more than zero and less than amount paid`);
    }
    if(whoPaid===forWhomPaid){
        throw new badRequest(`The user who paid and the user for whom paid cannot be the same`);
    }
    

    const userWhoPaid=await checkingPayerExistsInDatabase(whoPaid); // finding if the payer exists in the db and getting their id
    const groupInUserWhoPaid=await checkingGroupInUserPaid(groupId,userWhoPaid); // finding if the payer exists in the group
    req.body.whoPaid=userWhoPaid._id;
    

    const userForWhomPaid=await checkingForWhomPaidExistsInDatabase(forWhomPaid) // finding if the person for whom/to whom paid exists in the db and getting their id
    const groupUserForWhomPaid=await checkingGroupInUserForWhomPaid(groupId,userForWhomPaid); // finding if the person for whom/to whom paid exists in the group
    req.body.forWhomPaid=userForWhomPaid._id;

    if((req.body.whoPaid!=req.user.id )&&(req.body.forWhomPaid!=req.user.id)&&(req.user.id!=group.createdBy)){ // checking whether the creator of the expense is the creator of the group or whether the members of the expense are only creating that particular expense
        throw new unauth("You cannot create group for others");
    }
    req.body.createdBy=req.user.id;

    const expAlreadyExists=await expenseSchema.findOne({expName,whoPaid:req.body.whoPaid,forWhomPaid:req.body.forWhomPaid,groupId}); //checking whether this expense already exists in the group
    if(expAlreadyExists){
        throw new badRequest("This expense already exists in the group");
    }

    const expense=await expenseSchema.create(req.body);
    res.status(StatusCodes.CREATED).json(expense);
}


const deleteExpense=async(req,res)=>{
    const {params:{groupId,expenseId}}=req;
    const currentUser=req.user.id;

    const group=await checkingValidGroup(groupId);// checking if the group exists
    const groupCreatorId=group.createdBy;

    const expense=await expenseSchema.findOne({groupId:groupId,_id:expenseId});// checking if the expense exists
    if(!expense){
        throw new notFound("This expense is not found in the group");
    }

    const validUser=await expenseSchema.findOne({$or:[{forWhomPaid:currentUser},{whoPaid:currentUser}]});
    if(groupCreatorId!=currentUser&&!validUser){
        throw new unauth("You are not authorized to delete this expense");
    }
    
    await expense.deleteOne();
    res.status(StatusCodes.OK).json(expense);
}

// in update add 1 option if when amt returned is updated and total debt becomes less than or equal to 0,see then
const updateExpense=async(req,res)=>{
    let {params:{groupId,expenseId},body:{expName,amtPaid,whoPaid,forWhomPaid,amtReturned}}=req;
    const currentUser=req.user.id;

    const group=await checkingValidGroup(groupId);// checking if the group exists
    const groupCreatorId=group.createdBy;

    const expense=await expenseSchema.findOne({groupId:groupId,_id:expenseId});// checking if the expense exists 
    if(!expense){
        throw new notFound("This expense is not found in the group");
    }

    const whoPaidId=await userSchema.findOne({email:whoPaid}).select("_id");
    whoPaid=whoPaidId;

    const forWhomPaidId=await userSchema.findOne({email:forWhomPaid}).select("_id");
    forWhomPaid=forWhomPaidId;

    const validUser=await expenseSchema.findOne({$or:[{forWhomPaid:currentUser},{whoPaid:currentUser}]});
    if(groupCreatorId!=currentUser&&!validUser){
        throw new unauth("You are not authorized to update this expense");
    }

    checkingErrorsInUpdate(expense,expName,amtPaid,amtReturned,whoPaid,forWhomPaid);
    

    if(amtPaid && amtReturned){
        req.body.totalAmtDue=amtPaid-amtReturned;
    }
    else if(amtPaid){
        req.body.totalAmtDue=amtPaid-expense.amtReturned;
    }else if(amtReturned){
        req.body.totalAmtDue=expense.amtPaid-amtReturned;
    }


    if(whoPaid){
        const whoPaidUser =await checkingPayerExistsInDatabase(whoPaid);
        req.body.whoPaid=whoPaidUser._id;
        if(whoPaidUser._id.toString()!=req.user.id && whoPaidUser._id.toString()!=groupCreatorId && !group.grpMembers.includes(whoPaidUser._id.toString()) ){
            throw new badRequest(`User with id ${whoPaid} cannot be added into the field`);
        }
    }

    if(forWhomPaid){
        const forWhomPaidUser =await checkingForWhomPaidExistsInDatabase(forWhomPaid);
        req.body.forWhomPaid=forWhomPaidUser._id;
        if(forWhomPaidUser._id.toString()!=req.user.id && forWhomPaidUser._id.toString()!=groupCreatorId && !group.grpMembers.includes(forWhomPaidUser._id.toString())){
            throw new badRequest(`User with id ${forWhomPaid} cannot be added into the field`);
        }
    }
    await expense.updateOne(req.body,{
        runValidators:true,
        returnDocument:"after"
    });
    res.status(StatusCodes.OK).json(expense);
}

const getAllExpensesInGroup=async(req,res)=>{
    const {params:{groupId}}=req;

    const group=await checkingValidGroup(groupId);
    const currentUserId=req.user.id;
    if(!group.grpMembers.includes(currentUserId)){
        throw new unauth('You are not authorized to access this group');
    }

    const expenses=await expenseSchema.find({groupId,$or:[{whoPaid:currentUserId},{forWhomPaid:currentUserId},{createdBy:currentUserId}]}).populate([{path:"forWhomPaid",select:"email"},{path:"whoPaid",select:"email"}]);
    res.status(StatusCodes.OK).json({expenses});
}

const getExpense=async(req,res)=>{
    const {params:{groupId,expenseId}}=req;

    const group=await checkingValidGroup(groupId);
    const currentUserId=req.user.id;

    const expense=await expenseSchema.findOne({groupId,_id:expenseId}).populate([{path:"whoPaid",select:"email"},{path:"forWhomPaid",select:"email"}]);
    if(!expense){
        throw new notFound("This expense is not found in the group");
    }
    if(expense.whoPaid._id!=currentUserId && expense.forWhomPaid._id!=currentUserId && expense.createdBy!=currentUserId){
        throw new unauth("You are not authorized to access this expense");
    }

    res.status(StatusCodes.OK).json(expense);
}

const getAllExpenses=async(req,res)=>{
    const {params:{expenseId}}=req;

    const currentUserId=req.user.id;
    const expenses=await expenseSchema.find({_id:expenseId,$or:[{whoPaid:currentUserId},{forWhomPaid:currentUserId},{createdBy:currentUserId}]});
    res.status(StatusCodes.OK).json({expenses});
}

module.exports={createExpense,deleteExpense,updateExpense,getAllExpensesInGroup,getExpense};