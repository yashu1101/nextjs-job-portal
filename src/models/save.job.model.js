import mongoose from "mongoose";

const SaveJobSchema = mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},{timestamps: true});

export const SaveJob = mongoose.models.SaveJob || mongoose.model("SaveJob", SaveJobSchema);