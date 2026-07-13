const {StatusCodes}=require("http-status-codes");

const notFound=(req,res)=>{
    res.status(StatusCodes.NOT_FOUND).send("THIS PAGE IS NOT FOUND");
}

module.exports=notFound;