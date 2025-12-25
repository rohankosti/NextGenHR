import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({

    // emp_code: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },

    first_name: { type: String },
    last_name: { type: String },

    gender: {
        type: String,
        enum: ["Male", "Female", "Other"]
    },

    dob: { type: Date },

    contact_number: { type: String },

    email: {
        type: String,
        required: true,
        unique: true
    },

    department_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department"
    },

    designation_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Designation"
    },

    company_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company"
    },

    branch_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Branch"
    },

    join_date: { type: Date },

    employment_type: {
        type: String,
        enum: ["Full Time", "Part Time", "Intern"]
    },

    reporting_manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reporting_Manager"   // employee reporting to another employee
    },

    address_line1: { type: String },
    city: { type: String },
    state: { type: String },
    pincode: { type: String },

    photo_url: { type: String },

    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
    },

    status: {
        type: String,
        enum: ["probation", "confirmed", "resigned", "terminated"],
        default: "probation"
    },

}, { timestamps: true });

export default mongoose.model("Register", employeeSchema);
