const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type: String,required: true},
    email: {type: String,required: true,unique: true},
    role: {type: String,enum: ["employee", "manager", "admin"],default: "employee"},
    reporting_manager: {type: mongoose.Schema.Types.ObjectId,ref: 'User',},   // Reference to the User collectiondefault: null  // If no reporting manager
    created_at: {type: Date,default: Date.now},
});

module.exports = mongoose.model('User', userSchema);
