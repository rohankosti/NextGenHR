import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
    employee_id: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    date:{type:Date , require:true},
    check_in:{type:String},
    check_out:{type:String},
    status:{type:String,enum:['Present','Absent','Leave'], default:'Present'},
    source:{type:String,enum:['AI','Manual','Biometric']},
    worked_hour:{type:Number},
    remarks:{String},
},  {timestamps: true});

export default mongoose.model('Attendance', attendanceSchema,'Attendance');
                            

