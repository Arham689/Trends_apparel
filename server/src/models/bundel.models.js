import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const BundleSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  bundleName: {
    type: String,
    required: [true, 'Bundle name is required'],
    // unique : true ,
    trim : true ,
  },
  task_id: {
    type: String,
    // unique : true ,
    trim : true ,
  },
  bundle_operations: [{
    type: Schema.Types.ObjectId,
    ref: 'Operation',
    required: [true, 'At least one operation is required']
  }],
  color: {
    type: Schema.Types.ObjectId,
    ref: 'Color',
    required: [true, 'Color is required']
  },
  garment: {
    type: Schema.Types.ObjectId,
    ref: 'Garment',
    required: [true, 'Garment is required']
  },
  line_id: {
    type: Schema.Types.ObjectId,
    ref: 'Line',
    required: [true, 'Line ID is required']
  },
  production_date: {
    type: Date,
    required: [true, 'Production date is required']
  },
  section_id: {
    type: Schema.Types.ObjectId,
    ref: 'Section',
    required: [true, 'Section ID is required']
  },
  serial_start: {
    type: Number,
    required: [true, 'Serial start is required'],
  },
  serial_end: {
    type: Number,
    required: [true, 'Serial end is required'],
  },
  size: {
    type: Schema.Types.ObjectId,
    ref: 'Size',
    required: [true, 'Size is required']
  },
  status: {
    type: Number,
    default: 0
  },
  style: {
    type: Schema.Types.ObjectId,
    ref: 'Style',
    required: [true, 'Style is required']
  },
  supervisor_id: {
    type: Schema.Types.ObjectId,
    ref: 'Supervisor',
    required: [true, 'Supervisor ID is required']
  },
  Tidno: {
    type: Schema.Types.ObjectId,
    ref: 'TIDNO',
    required: [true, 'Trend ID is required']
  }
}, { timestamps: true });

export const Bundle =  mongoose.model('Bundle', BundleSchema);


