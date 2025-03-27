import mongoose from "mongoose";

const linesSchema = new mongoose.Schema({
    lineName : {
        type : String , 
        required : [true , 'lineName is required '],
        maxlength : [20 , 'lineName must not have more than 20 char'],
        minlength : [3 , 'lineName must have atleast 3 char'],
        unique : true , 
        trim : true , 
    }
} , {timestamps : true })

export const Line = mongoose.model( 'Line' , linesSchema)
