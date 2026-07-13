class customApiError extends Error{
    constructor(msg){
        super(msg);
    }
}

module.exports=customApiError;