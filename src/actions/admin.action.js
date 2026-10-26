'use server'

import { deleteFromCloudinary } from "@/lib/cloudinary";
import { CurrentUser, RoleChecker } from "@/lib/current-user";
import connectDB from "@/lib/db";
import { Application } from "@/models/application.model";
import { CandidateProfile } from "@/models/candidate.profile.model";
import { Job } from "@/models/job.model";
import { RecruiterProfile } from "@/models/recruiter.profile.model";
import { SaveJob } from "@/models/save.job.model";
import { User } from "@/models/user.model";
import { db } from "@/lib/auth";
import { Resume } from "@/models/resume.model";

export async function DeleteUserByAdmin(userId) {
    try {
        await connectDB();
        // GET CURRENT USER
        const currentUser = await CurrentUser();
        if (!currentUser) {
            return {
                status: false,
                message: "Unauthorized"
            }

        }
        // CHECK ROLE

        const admin = RoleChecker(currentUser, "admin");
        if (!admin) {
            return {
                status: false,
                message: "Unauthorized"
            }
        }

        // CHECK TARGET USER 

        const targetUser = await User.findById(userId)
        if (!targetUser) {
            return {
                status: false,
                message: 'User not found.'
            }
        }

        // CHECK TARGET USER ROLE 

        if (targetUser.role === 'admin') {
            return {
                status: false,
                message: 'Admin account cannot be deleted'
            }
        } else if (targetUser.role === 'candidate') {

            // DELETE RESUME 

            const resume = await Resume.findOne({ user: userId })

            if (resume?.resume?.publicId) {
                await deleteFromCloudinary(resume.resume.publicId)
            }

            await Resume.deleteMany({ user: userId })

            // DELETE APPLICATIONS 

            await Application.deleteMany({ user: userId })

            // DELETE SAVED JOB 

            await SaveJob.deleteMany({ user: userId })

            // DELETE PROFILE 

            const profile = await CandidateProfile.findOne({ user: userId })
            if (profile?.profilePhoto?.publicId) {
                await deleteFromCloudinary(profile.profilePhoto.publicId)
            }

            await CandidateProfile.deleteMany({ user: userId })
        } else if (targetUser.role === 'recruiter') {


            // DELETE JOBs

            await Job.deleteMany({ user: userId })

            // DELETE PROFILE 

            const profile = await RecruiterProfile.findOne({ user: userId })
            if (profile?.companyLogo?.publicId) {
                await deleteFromCloudinary(profile.companyLogo.publicId)
            }

            await RecruiterProfile.deleteMany({ user: userId })
        }

        // DELETE SESSION 

        await db.collection("session").deleteMany({
            userId: userId,
        });

        // DELETE ACCOUNT 
        await db.collection("account").deleteMany({
            userId: userId,
        });

        // DELETE TARGET USER 

        await User.findByIdAndDelete(userId)

        return {
            status: true,
            message: 'User deleted successfully by admin.'
        }

    } catch (error) {
        return {
            status: false,
            message: error.message || 'Something went wrong'
        }
    }
}