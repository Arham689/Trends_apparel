import mongoose,{Schema} from "mongoose";

const colorSchema =new Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "User",
        require : [true , "user id require "] , 
    },
    colorName : {
        type : String , 
        required : [true , 'Name is required '] , 
        trim : true , 
        // unique : true , 
        maxlength : [20 , 'color must not have more than 20 char'],
        minlength : [3 , 'Color must have atleast 3 char'],
        uppercase : true
    },
    status : {
        type : String ,
        enum  : ['Active' , 'Inactive'],
        required : [true , 'Status is required '] 
    }
}, {timestamps : true})

export const Color = mongoose.model('Color' , colorSchema)