const { StatusCodes } = require("http-status-codes");
const customApiError = require("./customApiError");

class notFound extends customApiError{
    constructor(msg){
        super(msg);
        this.statusCode=StatusCodes.NOT_FOUND;
    }
}

module.exports=notFound;