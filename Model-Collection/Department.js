const mongoose = require('mongoose');

const department_schema = new mongoose.Schema({
   name:{type:String,required:true},
   description:{type:String},

} , {timestamp:true});

module.exports= mongoose.model('Department',department_schema);
