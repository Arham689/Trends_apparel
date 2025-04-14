import mongoose from "mongoose";
const { Schema } = mongoose;

const operationSchema = new Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "User",
        required : [true , "user id require "] , 
    }, 
    operationName: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    rate: {
        type: Number,
        required: true
    },
    unitType: {
        type: Schema.Types.ObjectId,
        ref: 'UnitType',
        required: true
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    },
    style: {
        type: Schema.Types.ObjectId,
        ref: 'Style',
        required: true
    },
    garment: {
        type: Schema.Types.ObjectId,
        ref: 'Garment',
        required: true
    },
    sam: {
        type: Number,
        required: true
    },
    tgtPerHour: {
        type: Number,
        default: 0 // Can be calculated later
    },
    tgtPerDay: {
        type: Number,
        default: 0 // Can be calculated later
    }
}, { timestamps: true });

export const Operation = mongoose.model('Operation', operationSchema);
