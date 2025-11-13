const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    employee_id: {type: mongoose.Schema.Types.ObjectId, ref:'Employee'},
    date:{type:Date , require:true},
    check_in:{type:String},
    check_out:{type:String},
    status:{type:String,enum:['Present','Absent','Leave'], default:'Present'},
    source:{type:String,enum:['AI','Manual','Biometric']},
    worked_hour:{type:Number},
    remarks:{String},
},  {timestamps: true});

module.exports= mongoose.model('Attandance',attendanceSchema);


