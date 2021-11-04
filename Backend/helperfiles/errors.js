
function errors(err,req,res,next){
    try {
        if(err.name == 'ValidationError'){
            err.status = 400;
            err.message = 'Validation Error';
            err.errors = err.errors;
        }
        if(err.name == 'CastError'){
            err.status = 400;
            err.message = 'Invalid Id';
        }
        if(err.name == 'MongoError'){
            err.status = 400;
            err.message = 'Invalid Id';
        }
        if(err.name == 'JsonWebTokenError'){
            err.status = 401;
            err.message = 'Invalid Token';
        }
        if(err.name == 'TokenExpiredError'){
            err.status = 401;
            err.message = 'Token Expired';
        }
        if(err.name == 'AuthenticationError'){
            err.status = 401;
            err.message = 'UnAuthorized';
        }
        if(err.name == 'PermissionError'){
            err.status = 401;
            err.message = 'UnAuthorized';
        }
        if(err.name == 'Forbidden'){
            err.status = 403;
            err.message = 'Forbidden';
        }
        if(err.name == 'NotFound'){
            err.status = 404;
            err.message = 'Not Found';
        }
        if(err.name == 'BadRequest'){
            err.status = 400;
            err.message = 'Bad Request';
        }
        if(err.name == 'InternalServerError'){
            err.status = 500;
            err.message = 'Internal Server Error';
        }
        if(err.name == 'UnprocessableEntity'){
            err.status = 422;
            err.message = 'Unprocessable Entity';
        }
        if(err.name == 'ExpectationFailed'){
            err.status = 417;
            err.message = 'Expectation Failed';
        }
        if(err.name == 'ServiceUnavailable'){
            err.status = 503;
            err.message = 'Service Unavailable';
        }
        if(err.name == 'BadGateway'){
            err.status = 502;
            err.message = 'Bad Gateway';
        }
        if(err.name == 'GatewayTimeout'){
            err.status = 504;
            err.message = 'Gateway Timeout';
        }
    }
    catch(e){
        console.log(e);
    }
    return err;
}



module.exports = errors;