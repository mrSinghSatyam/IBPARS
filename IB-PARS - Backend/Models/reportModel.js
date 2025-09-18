import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  issueType: {
    type: String,
    required: true
  },
  severity: {
    type: String,
    required: true,
    enum: ['low', 'medium', 'high', 'critical']
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  contactEmail: {
    type: String,
    required: true
  },
  affectedServices: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Report = mongoose.model('Report', reportSchema);
export default Report;
