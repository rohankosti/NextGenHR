import mongoose from 'mongoose';

const leaveRequestSchema = new mongoose.Schema({
  employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  leave_type : { type: String, enum: ['Sick Leave', 'Casual Leave', 'Earned Leave', 'Maternity Leave', 'Paternity Leave', 'Bereavement Leave'] },
  from_date: Date,
  to_date: Date,
  reason: String,
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  approved_by: { type: String }
}, { timestamps: true });

export default mongoose.model('LeaveRequset', leaveRequestSchema,'LeaveRequset');