import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    name: {type: String,required: true},
    email: {type: String,required: true,unique: true},
    role: {type: String,enum: ["employee", "manager", "admin"],default: "employee"},
    reporting_manager: {type:String,},   // Reference to the User collectiondefault: null  // If no reporting manager
    created_at: {type: Date,default: Date.now},
});

export default mongoose.model('Reporting_Manager', userSchema);
