const { StatusCodes } = require("http-status-codes");
const customApiError = require("./customApiError");

class unauth extends customApiError{
    constructor(msg){
        super(msg);
        this.statusCode=StatusCodes.UNAUTHORIZED;
    }
}

module.exports=unauth;