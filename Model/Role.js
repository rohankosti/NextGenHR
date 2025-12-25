import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
  role_name: { type: String, required: true },
  description: String
}, { timestamps: true });

export default mongoose.model('Role', roleSchema);