import mongoose,{Schema} from "mongoose";

const TIDNOmodel =new Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "User",
        required : [true , "user id require "] , 
    },
    TIDNOName : {
        type : String , 
        required : [true , ' TID Name is required '] , 
        trim : true , 
        // unique : true , 
        maxlength : [10 , 'TID must not have more than 10 char'],
        minlength : [3 , 'TID must have atleast 3 char'],
        uppercase : true
    },
    status : {
        type : String ,
        enum  : ['Active' , 'Inactive'],
        required : [true , 'Status is required '] 
    }
}, {timestamps : true})

export const TIDNO = mongoose.model('TIDNO' , TIDNOmodel)