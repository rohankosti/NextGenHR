const mongoose = require('mongoose');

const designationschema = new mongoose.Schema({

    tittle:{type:String,required:true},
    department_id:{type:mongoose.Schema.Types.ObjectId,ref:'Department'},
    description:{type:String},
} ,{timestamps:true}); 
module.exports = mongoose.model('Department',designationschema);