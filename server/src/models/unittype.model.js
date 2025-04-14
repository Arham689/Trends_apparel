import mongoose, { Schema }  from "mongoose";

const unitTypeSechma = new Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "User",
        required : [true , "user id require "] , 
    },
    unitTypeName : {
        type : String, 
        required : [true , "type id require "],
        trim : true , 
    }
})

export const UnitType = mongoose.model('UnitType', unitTypeSechma)
