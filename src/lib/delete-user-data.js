import { CandidateProfile } from "@/models/candidate.profile.model";
import { RecruiterProfile } from "@/models/recruiter.profile.model";
import connectDB from "./db";
import { deleteFromCloudinary } from "./cloudinary";
import { Resume } from "@/models/resume.model";
import { Application } from "@/models/application.model";
import { SaveJob } from "@/models/save.job.model";
import { Job } from "@/models/job.model";

export default async function DeleteUserData(user) {
    await connectDB();

    try {

        // DELETE USER DATA 
        if (user.role === "candidate") {
            // DELETE CANDIDATE PROFILE DATA 
            const profile = await CandidateProfile.findOne({
                user: user.id,
            });

            if (profile?.profilePhoto?.publicId) {
                await deleteFromCloudinary(profile.profilePhoto.publicId);
            }

            await CandidateProfile.deleteMany({ user: user.id });

            // DELETE APPLICATION DATA 

            await Application.deleteMany({ user: user.id })

            // DELETE RESUME DATA 

            const resume = await Resume.findOne({ user: user.id })
            if (resume.resume.publicId) {
                await deleteFromCloudinary(resume.resume.publicId)
            }

            await Resume.deleteMany({ user: user.id })

            // DELETE SAVED JOBS 

            await SaveJob.deleteMany({ user: user.id })
        } else if (user.role === "recruiter") {

            // DELETE RECRUITER PROFILE DATA 
            const profile = await RecruiterProfile.findOne({
                user: user.id,
            });

            if (profile?.companyLogo?.publicId) {
                await deleteFromCloudinary(profile.companyLogo.publicId);
            }

            await RecruiterProfile.deleteMany({ user: user.id });

            // DELETE JOBS 

            await Job.deleteMany({ user: user.id })
        }


    } catch (error) {
        console.error("Delete user data failed:", error);
        throw error;
    }
}