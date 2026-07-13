const {StatusCodes}=require("http-status-codes");

const errorHandler=(err,req,res,next)=>{
    const customErrors={
        status:err.statusCode||StatusCodes.INTERNAL_SERVER_ERROR,
        msg:err.message||"There is some error.Try Again"
    }
    console.log(err);
    if(err.code===11000){
        customErrors.status=400;
        customErrors.msg=`You provided with duplicate value for ${Object.keys(err.keyValue)}`;
    }
    
    // properly add validation error ,cast error and other related errors
    if(err.name==="ValidationError"){
        customErrors.status=400;
        customErrors.msg=`Provide correct value for ${Object.values(err.errors).map(el=>el.path)}`;
    }
    if(err.name==="CastError"){
        customErrors.status=400;
        customErrors.msg=`Provide correct value for ${(err.path)}.\n${err.value} is not valid`;
    }
    
    res.status(customErrors.status).json({message:customErrors.msg});
}

module.exports=errorHandler;