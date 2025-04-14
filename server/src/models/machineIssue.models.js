import mongoose , {Schema} from 'mongoose'

const machineIssueSchema = new Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "User",
        required : [true , "user id require "] , 
    },
    issueName : {
        type : String , 
        required : [true , ' issue Name is required '] , 
        trim : true , 
        // unique : true , 
        maxlength : [20 , 'issue name must not have more than 20 char'],
        minlength : [3 , 'issue name must have atleast 3 char'],
    },
    issueCode : {
        type : String , 
        required : [true , ' issue Name is required '] , 
        trim : true , 
        // unique : true , 
        maxlength : [20 , 'issue code must not have more than 20 char'],
        minlength : [3 , 'issue code must have atleast 3 char']
    }
})

export const MachineIssue = mongoose.model('MachineIssue' , machineIssueSchema )