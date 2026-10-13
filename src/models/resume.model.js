import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        resume: {
            name: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true,
            },
            publicId: {
                type: String,
                required: true,
            },
        },


    },
    {
        timestamps: true,
    }
);

export const Resume =
    mongoose.models.Resume ||
    mongoose.model("Resume", ResumeSchema);