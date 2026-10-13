import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    jobTitle: {
        type: String,
        required: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RecruiterProfile'
    },
    jobType: {
        type: String,
        required: true,
    },
    jobCategory: {
        type: String,
        required: true
    },
    jobMode: {
        type: String,
        required: true
    },
    jobLocation: {
        type: String,
        required: true
    },

    jobQualification: {
        type: String,
        required: true,
    },

    jobSkills: {
        type: [String],
        required: true
    },
    jobSalary: {
        type: Number,
        required: true
    },
    jobDescription: {
        type: String,
        required: true
    },
    jobResponsibilities: {
        type: [String],
        required: true,
    }


}, { timestamps: true });



export const Job = mongoose.models.Job || mongoose.model('Job', JobSchema)