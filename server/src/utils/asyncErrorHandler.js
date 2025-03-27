export const asyncErrorHandler = (func)=>{
    // this fun is called by express when we hit a api , so we have the access to req , res , next 
    return (req , res , next)=> {
        func(req  , res , next ).catch(err => next(err))
    }
} 
