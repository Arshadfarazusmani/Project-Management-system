class api_error extends Error{
    constructor(
        statuscode,message="An error occured",error=[],stack=""
    ){

        super(message);
        this.statuscode=statuscode;
        this.data=null;
        this.message=message;
        this.error=error;
        this.success=false;

        if (stack) {
            this.stack=stack
            
        } else {
            Error.captureStackTrace(this,this.constructor)
            
        }
    }
}

export{api_error}