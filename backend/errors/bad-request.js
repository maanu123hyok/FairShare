const { StatusCodes } = require("http-status-codes");
const customApiError = require("./customApiError");

class badRequest extends customApiError{
    constructor(msg){
        super(msg);
        this.statusCode=StatusCodes.BAD_REQUEST;
    }
}

module.exports=badRequest;