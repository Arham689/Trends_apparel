import mongoose  from "mongoose";

const hourlyReportSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    task_id: { type: String, required: true }, // e.g., Base64 encoded
    production_date: { type: String, required: true }, // Format: "YYYY-MM-DD"
    
    sam: { type: Number, default: null }, // originally string, but better as Number
    tgt_hr: { type: Number, default: null }, // target per hour
    tgt_day: { type: Number, default: null }, // target per day

    operationName: { type: String , required: true }, // e.g., "CUTTING ISSUE"
    // production_report_id: { type: Number, required: true },
    worker: { type: mongoose.Schema.Types.ObjectId, ref: 'Worker', default: null },
    time_slots: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TimeSlot', required: true }],
    operation_id  : { type: mongoose.Schema.Types.ObjectId, ref: 'Operation', default: null }
} , {timestamps : true })

export const HourlyReport = mongoose.model('HourlyReport' , hourlyReportSchema )