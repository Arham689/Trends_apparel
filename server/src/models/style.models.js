import mongoose, { Schema } from "mongoose";

const styleSchema = new Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "User",
        required : [true , "user id require "] , 
    },
    styleName : {
        type : String , 
        required : [true , ' styles Name is required '] , 
        trim : true , 
        // unique : true , 
        maxlength : [20 , 'style must not have more than 10 char'],
        minlength : [3 , 'style must have atleast 3 char'],
        uppercase : true
    },
    status : {
        type : String ,
        enum  : ['Active' , 'Inactive'],
        required : [true , 'Status is required '] 
    },
    Tidno  : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'TIDNO',
        required : [true , 'tidno is require ']
    }   
} , {timestamps : true})

export const Style = mongoose.model('Style' , styleSchema )