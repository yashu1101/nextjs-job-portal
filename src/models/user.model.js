import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        role: String,
    },
    {
        collection: "user",
    }
);

export const User =
    mongoose.models.User || mongoose.model("User", UserSchema);