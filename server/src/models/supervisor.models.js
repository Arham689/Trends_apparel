import mongoose from 'mongoose';

const supervisorSchema = new mongoose.Schema({
  userId : {
    type : mongoose.Schema.Types.ObjectId ,
    ref : 'User',
    required :  [true , "user id require "] , 
  },
  supervisorName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  employeeId: {
    type: String,
    required: true,
    unique: true
  },
  designation: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'], // Example values
    required: true
  },
  image: {
    type: String // path or URL to uploaded image
  }
}, {
  timestamps: true // Adds createdAt and updatedAt
});

const Supervisor = mongoose.model('Supervisor', supervisorSchema);

export default Supervisor;
