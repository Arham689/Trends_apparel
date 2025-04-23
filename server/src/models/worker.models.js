import mongoose, {Schema} from 'mongoose'

const workerSchema = new Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "User",
        required : [true , "user id require "] , 
    },
    workerName : {
        type : String , 
        required : [true , ' Name is required '] , 
        trim : true , 
        // unique : true , 
        maxlength : [20 , 'name must not have more than 20 char'],
        minlength : [3 , 'name must have atleast 3 char'],
    },
    employeeId : {
        type : String , 
        required : [true , ' e_id is required '] , 
        trim : true , 
        unique : true , 
        maxlength : [20 , 'e_id must not have more than 20 char'],
        minlength : [3 , 'e_id must have atleast 3 char'],
    },
    mobileNo : {
        type : Number ,
        required : true,
        unique : true ,
        maxlength : [10 , 'mobile number must not have more than 10 char'],
        minlength : [10 , 'mobile number must have atleast 10 char'],
    },
    designation : {
        type : String , 
        required : [true , ' designation is required '] , 
        trim : true , 
        // unique : true , 
        maxlength : [20 , 'designation must not have more than 20 char'],
        minlength : [3 , 'designation must have atleast 3 char'],
    },
    address : {
        type : String , 
        required : [true , ' address is required '] , 
        trim : true , 
        // unique : true , 
        maxlength : [30 , 'address must not have more than 30 char'],
        minlength : [5 , 'address must have atleast 5 char'],
    },
    city : {
        type : String , 
        required : [true , ' city is required '] , 
        trim : true , 
        // unique : true , 
        maxlength : [30 , 'city must not have more than 30 char'],
        minlength : [5 , 'city must have atleast 5 char'],
    },
    status : {
        type : String ,
        enum  : ['Active' , 'Inactive'],
        required : [true , 'Status is required '] 
    },
    image : {
        type : String , 
    },
    operations: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Operation',
        },
    ],
    

} , {timestamps : true })

export const Worker = mongoose.model('Worker' , workerSchema )
