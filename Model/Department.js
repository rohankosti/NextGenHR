import mongoose from 'mongoose';


const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  company_id : { type: String, required:true },
  branch_id : { type:String, required:true },
  manager: { type: String, required: true },
  description: String
}, { timestamps: true });

export default mongoose.model('Department', departmentSchema,'Department');