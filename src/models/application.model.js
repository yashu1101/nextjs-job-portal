import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    status: {
        type: String,
        enum: ['applied', 'shortlisted', 'hired', 'rejected', 'withdrawn'],
        default: 'applied',
        required: true
    },

    resume:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resume',
        required: true
    }

}, { timestamps: true });



export const Application = mongoose.models.Application || mongoose.model('Application', ApplicationSchema)