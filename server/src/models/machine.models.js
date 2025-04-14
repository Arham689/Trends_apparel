import mongoose, {Schema} from 'mongoose'

const machineSchema = new Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "User",
        required : [true , "user id require "] , 
    },
    machineName : {
        type : String , 
        required : [true , 'machineName is required '] , 
        trim : true , 
        // unique : true , 
        maxlength : [20 , 'machine must not have more than 20 char'],
        minlength : [3 , 'machine must have atleast 3 char'],
    },
    machineCode : {
        type : String , 
        required : [true , 'machineCode is required '] , 
        trim : true , 
        // unique : true , 
        maxlength : [20 , 'machine code must not have more than 20 char'],
        minlength : [3 , 'machine code must have atleast 3 char']
    },
    machineValue : {
        type : String , 
        required : [true , 'machineValue is required '] , 
        trim : true , 
        // unique : true , 
        maxlength : [20 , 'machine value must not have more than 20 char'],
        minlength : [3 , 'machine value must have atleast 3 char']
    },
    status : {
        type : String ,
        enum  : ['Active' , 'Inactive'],
        required : [true , 'Status is required '] 
    }
}, {timestamps : true })

export const Machine = mongoose.model("Machine" , machineSchema)