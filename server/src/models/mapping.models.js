import mongoose from 'mongoose';

const OperationMappingSchema = new mongoose.Schema({
  Op_id: {
    type: Number,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  tidno: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TIDNO',
    required: true,
  },
  style: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Style',
    required: true,
  },
  garment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Garment',
    required: true,
  },
  operations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Operation',
    },
  ],
}, { timestamps: true });

export const Mapping =  mongoose.model('OperationMapping', OperationMappingSchema);
