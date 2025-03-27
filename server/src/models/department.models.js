import mongoose,{Schema} from "mongoose";

const departmentmodel =new Schema({
    DepartmentName : {
        type : String , 
        required : [true , 'Name is required '] , 
        trim : true , 
        unique : true , 
        maxlength : [20 , 'DepartmentName must not have more than 20 char'],
        minlength : [3 , 'DepartmentName must have atleast 3 char'],
        uppercase : true
    },
    status : {
        type : String ,
        enum  : ['Active' , 'Inactive'],
        required : [true , 'Status is required '] 
    }
}, {timestamps : true})

export const Department = mongoose.model('Department' , departmentmodel)