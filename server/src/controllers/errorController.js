import customError from "../utils/CustomError.js"
const prodError = (res , err )=>{
    if(err.isOperational){
        res.status(err.statusCode).json({
            status : err.statusCode,
            message : err.message ,
        })
    }
    else {
        res.status(500).json({
            status : "fail",
            message : 'Something went wrong please try again latter '
        })
    }
}

const devError = (res, err )=>{
    res.status(err.statusCode).json({
        status : err.statusCode,
        message : err.message ,
        stackTrace : err.stack , 
        err ,
    })
}
const castErrorHandler = (err) => {
    const msg = `Invalid value for ${err.path}: ${err.value}!`
    return new customError(msg, 400);
}

const duplicateKeyErrorHandler = (err) => {
 const name = err.keyValue.name;
 const msg = `There is already a movie with name ${name}. Please use another name!`;
 
 return new customError(msg, 400);
}

const validationErrorHandler = (err) => {
    const errors = Object.values(err.errors).map(val => val.message);
    const errorMessages = errors.join('. ');
    const msg = `Invalid input data: ${errorMessages}`;

    return new customError(msg, 400);
}


export default (err , req , res , next )=>{
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'
    if(process.env.NODE_ENV === "development"){
        devError(res , err )
    } 
    else if(process.env.NODE_ENV === 'production'){
        if(err.name === 'CastError') err = castErrorHandler(err);
        if(err.code === 11000) err = duplicateKeyErrorHandler(err);
        if(err.name === 'ValidationError') err = validationErrorHandler(err);
        prodError(res , err )
    }
}