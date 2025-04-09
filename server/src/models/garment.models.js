import mongoose , {Schema} from "mongoose";

const garmentSchema = new Schema({

    userId : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "User",
        require : [true , "user id require "] , 
    },
    garmentName : {
        type : String , 
        required : [true , 'garmentName is required '] ,
        trim : true , 
        uppercase: true
        // unique : true 
    },
    style : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'Style',  
        required : [true , 'Style object id is required '] 
    },
    orderQuantity : {
        type : String , 
        required : [true , 'orderQuantity is required '] ,
        trim : true , 
    },
    color : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'Color',
        required : [true , 'color object id is required '] 
    }
    
} , {timestamps : true })

export const Garment = mongoose.model('Garment' , garmentSchema )