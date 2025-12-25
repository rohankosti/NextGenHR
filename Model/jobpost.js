import mongoose from 'mongoose';

const jobpost = new mongoose.Schema({
name:   { type: String, required: true, unique: true},
email: { type: String, required: true, unique: true},
position: { type: String, required: true, unique: true},
resume: { type: String, required: true, unique: true},
}, { timestamps: true });

export default mogoose.model('jobvecancy', jobpost );