import mongoose from "mongoose";

const CandidateProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    profilePhoto: {
        url: {
            type: String,
        },
        publicId: {
            type: String,
        },
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },

    qualification: {
        type: String,
        required: true
    },

    studyField: {
        type: String,
        required: true,
    },

    professionalTitle: {
        type: String,
        required: true
    },
    skill: {
        type: [String],
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },

}, { timestamps: true });



export const CandidateProfile = mongoose.models.CandidateProfile || mongoose.model('CandidateProfile', CandidateProfileSchema)