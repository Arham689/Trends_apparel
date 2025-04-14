import mongoose from "mongoose";

const sizeSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "User",
        required : [true , "user id require "] , 
    },
    sizeName : {
        type : String , 
        required : [true , 'sizeName is required '],
        maxlength : [10 , 'sizeName must not have more than 20 char'],
        minlength : [1 , 'sizeName must have atleast 3 char'],
        // unique : true , 
        trim : true , 
    }
} , {timestamps : true })

export const Size = mongoose.model( 'Size' , sizeSchema)
