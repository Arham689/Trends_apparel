import mongoose from "mongoose";

const sectoinSchema = new mongoose.Schema({
    sectionName : {
        type : String , 
        required : [true , 'SectoinName is required '] ,
        trim : true , 
        unique : true 
    },
    lineName : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'Line',
        required : [true , 'Line object id is required '] 
    }
} , {timestamps : true })

export const Section = mongoose.model( 'Section' , sectoinSchema )
