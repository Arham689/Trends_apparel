import mongoose from "mongoose";
const timeSlotSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required']
    },
    slot_time: { 
        type: String, 
        required: true 
    },
    task_id: { 
        type: String, 
        required: true 
    },
    status: { 
        type: String, 
        default: 0 
    }, // or Number
    qty_done: { 
        type: Number, 
        default: 0 
    },
    production_date: { 
        type: String, 
        required: true ,
    },
    worker: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref : 'Worker',
        default: null 
    }, // worker id 
    issue : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'MachineIssue', 
        default: null
    },
    SAM: { 
        type: Number, 
        default: null
    },
    tgt_hr: { 
        type: Number, 
        default: null
    },
    tgt_day: { 
        type: Number, 
        default: null
    },
    supervisor_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Supervisor', 
        default: null 
    },
}, { timestamps: true })

export const TimeSlot = mongoose.model('TimeSlot', timeSlotSchema)