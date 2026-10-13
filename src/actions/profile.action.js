'use server'

import { deleteFromCloudinary, uploadOnCloudinary } from "@/lib/cloudinary"
import connectDB from "@/lib/db"
import { CurrentUser, RoleChecker } from "@/lib/current-user"
import { CandidateProfile } from "@/models/candidate.profile.model"
import { RecruiterProfile } from "@/models/recruiter.profile.model"
import { redirect } from "next/navigation"

// CANDIDATE PROFILE ACTION
export async function CandidateProfileAction(previousState, formdata) {


    try {
        const { profilePhoto, phone, qualification, studyField, professionalTitle, skill, city, state, country } = Object.fromEntries(formdata)
        if (!profilePhoto || !phone || !qualification || !studyField || !professionalTitle || !skill || !city || !state || !country) return {
            status: false,
            message: "All field are required!"
        }

        // CONNECT DATABASE

        await connectDB()

        // CHECK ROLE

        const isCandidate = await RoleChecker('candidate')

        if (!isCandidate) {
            console.log('Unauthorized')
            return {
                status: false,
                message: "Unauthorized"
            }
        }

        // UPLOAD PROFILE PHOTO ON CLOUDINARY
        if (!profilePhoto || profilePhoto.size === 0) {
            return {
                success: false,
                message: "profile photo is required",
            };
        }

        if (!profilePhoto.type.startsWith("image/")) {
            return {
                success: false,
                message: "Only images are allowed",
            };
        }

        const result = await uploadOnCloudinary(
            "job-portal/profile",
            profilePhoto
        );

        console.log("Cloudinary upload result:", result);
        if (!result) {
            return {
                success: false,
                message: "Upload failed",
            };
        }
        // GET CURRENT USER
        const user = await CurrentUser()
        // CHECK IF ALREADY EXIST 

        const profile = await CandidateProfile.findOne({ user: user.id })
        if (profile) return { status: false, message: "Profile already created" }

        //CREATE CANDIDATE PROFILE
        const candidateProfile = await CandidateProfile.create({
            user: user.id,
            profilePhoto: {
                url: result.url,
                publicId: result.publicId
            },
            phone,
            qualification,
            studyField,
            professionalTitle,
            skill: skill.split(',').map(s => s.trim()).filter(Boolean), // Convert comma-separated string to array
            city,
            state,
            country
        })

    
        if (!candidateProfile) return {
            status: false,
            message: "Profile not created"
        }

        return {
            status: true,
            message: "Profile created successfully."
        }

    } catch (error) {
        console.log(error)
        

        return {
            status: false,
            message: error.message || "An error occurred while creating the candidate profile."
        }
    }
}
// RECRUITER PROFILE ACTION
export async function RecruiterProfileAction(previousState, formdata) {
    try {
        const { phone, companyName, companyLogo, companyType, companyLocation, companyRegistrationNumber, companyDescription } = Object.fromEntries(formdata)

        if (!phone || !companyName || !companyType || !companyLocation || !companyRegistrationNumber || !companyDescription) return {
            status: false,
            message: "All field are required!"
        }

        // UPLOAD PROFILE PHOTO ON CLOUDINARY
        if (!companyLogo || companyLogo.size === 0) {
            return {
                success: false,
                message: "File is required",
            };
        }

        if (!companyLogo.type.startsWith("image/")) {
            return {
                success: false,
                message: "Only images are allowed",
            };
        }

        const result = await uploadOnCloudinary(
            "job-portal/profile",
            companyLogo
        );

        console.log("Cloudinary upload result:", result);
        if (!result) {
            return {
                success: false,
                message: "Upload failed",
            };
        }
        // CONNECT DATABASE

        await connectDB()

        // CHECK ROLE

        const isRecruiter = await RoleChecker('recruiter')

        if (!isRecruiter) {
            console.log('Unauthorized')
            return {
                status: false,
                message: "Unauthorized"
            }
        }

        // GET CURRENT USER
        const user = await CurrentUser()

        // CHECK IF ALREADY EXIST 

        const profile = await RecruiterProfile.findOne({ user: user.id })
        if (profile) return { status: false, message: "Profile already created" }
        //CREATE RECRUITER PROFILE
        const recruiterProfile = await RecruiterProfile.create({
            user: user.id,
            phone,
            companyName,
            companyLogo: {
                url: result.url,
                publicId: result.publicId
            },
            companyType,
            companyLocation,
            companyRegistrationNumber,
            companyDescription
        })

        if (!recruiterProfile) return {
            status: false,
            message: "Profile not created"
        }

        return {
            status: true,
            message: "Profile created successfully."
        }

    } catch (error) {
        console.log(error)
        return {
            status: false,
            message: error.message || "An error occurred while creating the recruiter profile."
        }
    }
}


// GET USER PROFILE 

export async function GetProfile() {
    try {
        // GET CURRENT USER
        const user = await CurrentUser()
        if (!user) return {
            status: false,
            message: "Unauthorized"
        }
        // CONNECT DB

        await connectDB()
        // FETCH USER PROFILE

        let userProfile;

        if (user.role === 'candidate') {
            userProfile = await CandidateProfile.findOne({ user: user.id }).lean()

        }
        if (user.role === 'recruiter') {
            userProfile = await RecruiterProfile.findOne({ user: user.id }).lean()
        }

        if (!userProfile) return {
            status: false,
            message: "Profile not found"
        }

        return {
            status: true,
            profile: JSON.parse(JSON.stringify(userProfile))
        }
    } catch (error) {
        console.log(error)
        return {
            status: false,
            message: error.message || "An error occurred while fetching the profile."
        }
    }
}


// UPDATE PROFILE ACTION 

export async function UpdateProfileAction(previousState, formdata) {
    try {
        const user = await CurrentUser();

        if (!user) {
            return {
                status: false,
                message: "Unauthorized"
            };
        }

        await connectDB();

        const data = Object.fromEntries(formdata);

        // =========================
        // CANDIDATE
        // =========================

        if (user.role === "candidate") {

            const profile = await CandidateProfile.findOne({
                user: user.id
            });

            if (!profile) {
                return {
                    status: false,
                    message: "Profile not found"
                };
            }

            profile.phone = data.phone;
            profile.qualification = data.qualification;
            profile.studyField = data.studyField;
            profile.professionalTitle = data.professionalTitle;
            profile.skill = data.skill
                .split(",")
                .map(s => s.trim())
                .filter(Boolean);
            profile.city = data.city;
            profile.state = data.state;
            profile.country = data.country;

            // NEW PROFILE PHOTO
            const profilePhoto = data.profilePhoto;

            if (profilePhoto && profilePhoto.size > 0) {

                if (!profilePhoto.type.startsWith("image/")) {
                    return {
                        status: false,
                        message: "Only images are allowed"
                    };
                }

                // Upload new image first
                const result = await uploadOnCloudinary(
                    "job-portal/profile",
                    profilePhoto
                );

                if (!result) {
                    return {
                        status: false,
                        message: "Upload failed"
                    };
                }

                // Delete old image
                if (profile.profilePhoto?.publicId) {
                    await deleteFromCloudinary(
                        profile.profilePhoto.publicId
                    );
                }

                // Save new image
                profile.profilePhoto = {
                    url: result.url,
                    publicId: result.publicId
                };
            }

            await profile.save();

            return {
                status: true,
                message: "Profile updated successfully."
            };
        }

        // =========================
        // RECRUITER
        // =========================

        if (user.role === "recruiter") {

            const profile = await RecruiterProfile.findOne({
                user: user.id
            });

            if (!profile) {
                return {
                    status: false,
                    message: "Profile not found"
                };
            }

            profile.phone = data.phone;
            profile.companyName = data.companyName;
            profile.companyType = data.companyType;
            profile.companyLocation = data.companyLocation;
            profile.companyRegistrationNumber =
                data.companyRegistrationNumber;
            profile.companyDescription = data.companyDescription;

            // NEW COMPANY LOGO
            const companyLogo = data.companyLogo;

            if (companyLogo && companyLogo.size > 0) {

                if (!companyLogo.type.startsWith("image/")) {
                    return {
                        status: false,
                        message: "Only images are allowed"
                    };
                }

                // Upload new logo first
                const result = await uploadOnCloudinary(
                    "job-portal/profile",
                    companyLogo
                );

                if (!result) {
                    return {
                        status: false,
                        message: "Upload failed"
                    };
                }

                // Delete old logo
                if (profile.companyLogo?.publicId) {
                    await deleteFromCloudinary(
                        profile.companyLogo.publicId
                    );
                }

                // Save new logo
                profile.companyLogo = {
                    url: result.url,
                    publicId: result.publicId
                };
            }

            await profile.save();

            return {
                status: true,
                message: "Profile updated successfully."
            };
        }

        return {
            status: false,
            message: "Invalid role"
        };

    } catch (error) {
        console.log(error);

        return {
            status: false,
            message:
                error.message ||
                "An error occurred while updating the profile."
        };
    }
}
