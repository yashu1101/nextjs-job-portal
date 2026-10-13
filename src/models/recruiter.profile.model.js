import mongoose from "mongoose";

const RecruiterProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },

    
    companyName: {
        type: String,
        required: true,
    },
    companyLogo: {
        url: {
            type: String,
        },
        publicId: {
            type: String,
        },
    },
    companyType: {
        type: String,
        required: true,
    },

    companyLocation: {
        type: String,
        required: true
    },
    companyRegistrationNumber: {
        type: String,
        required: true
    },
    companyDescription: {
        type: String,
        required: true
    },


}, { timestamps: true });



export const RecruiterProfile = mongoose.models.RecruiterProfile || mongoose.model('RecruiterProfile', RecruiterProfileSchema)