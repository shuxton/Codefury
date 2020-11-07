class ExpressError extends Error{
    constructor(message , statusCode){
        super(); //dk what is this 
        this.message = message ;
        this.statusCode = statusCode ;
    }
}

module.exports = ExpressError ;