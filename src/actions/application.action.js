'use server'

import { uploadOnCloudinary } from "@/lib/cloudinary";
import { CurrentUser, RoleChecker } from "@/lib/current-user";
import connectDB from "@/lib/db";
import { Application } from "@/models/application.model"
import { Job } from "@/models/job.model";
import { RecruiterProfile } from "@/models/recruiter.profile.model";
import { Resume } from "@/models/resume.model";
import { revalidatePath } from "next/cache";



// APPLY JOB ACTION



export async function ApplyJobAction(previousState, formData) {
    try {
        const { jobId, resume } = Object.fromEntries(formData);

        console.log("jobId:", jobId);
        console.log("resume:", resume);

        if (!jobId) {
            return {
                status: false,
                message: "Job ID is required."
            };
        }

        // CHECK CURRENT USER
        const user = await CurrentUser();

        if (!user) {
            return {
                status: false,
                message: "Unauthorized"
            };
        }

        // CHECK ROLE
        const candidate = await RoleChecker("candidate");

        if (!candidate) {
            return {
                status: false,
                message: "Unauthorized"
            };
        }

        await connectDB();

        // CHECK EXISTING RESUME
        let existingResume = await Resume.findOne({
            user: user.id
        });

        // NEW RESUME UPLOAD
        if (!existingResume && resume) {
            const result = await uploadOnCloudinary(
                "job-portal/resume",
                resume
            );

            if (!result) {
                console.log("Resume upload failed.");

                return {
                    status: false,
                    message: "Resume upload failed."
                };
            }

            existingResume = await Resume.create({
                user: user.id,
                resume: {
                    name: resume.name,
                    url: result.url,
                    publicId: result.publicId
                }
            });
        }

        // RESUME REQUIRED
        if (!existingResume) {
            return {
                status: false,
                message: "Resume is required."
            };
        }

        // CHECK EXISTING APPLICATION
        const existingApplication = await Application.findOne({
            job: jobId,
            user: user.id
        });

        // RE-APPLY AFTER WITHDRAW
        if (existingApplication?.status === "withdrawn") {

            await Application.findByIdAndUpdate(
                existingApplication._id,
                {
                    status: "applied",
                    resume: existingResume._id
                }
            );

            return {
                status: true,
                message: "Application submitted successfully."
            };
        }

        // ALREADY APPLIED
        if (existingApplication) {
            return {
                status: false,
                message: "You have already applied for this job."
            };
        }

        // CREATE NEW APPLICATION
        await Application.create({
            job: jobId,
            user: user.id,
            resume: existingResume._id
        });

        return {
            status: true,
            message: "Application submitted successfully."
        };

    } catch (error) {
        console.log(error);

        return {
            status: false,
            message: "Something went wrong."
        };
    }
}

// GET RESUME ACTION

export async function GetResume() {
    try {
        // CHECK CURRENT USER

        const user = await CurrentUser()

        if (!user) {
            return {
                status: false,
                message: "Unauthorized"
            }
        }

        // GET RESUME
        const resume = await Resume.findOne({
            user: user.id
        });
        if (!resume) {
            return {
                status: false,
                message: "Resume not found"
            }
        }

        return {
            status: true,
            resume: JSON.parse(JSON.stringify(resume))

        }

    } catch (error) {
        return {
            status: false,
            message: error.message || 'Something went wrong'
        }
    }
}

// WITHDRAW APPLICATION ACTION
export async function WithdrawApplicationAction(applicationId) {
    try {
        // CHECK CURRENT USER
        const user = await CurrentUser();

        if (!user) {
            return {
                status: false,
                message: "Unauthorized"
            };
        }

        // FIND APPLICATION
        const application = await Application.findById(applicationId);

        if (!application) {
            return {
                status: false,
                message: "Application not found"
            };
        }

        // CHECK OWNER
        if (application.user.toString() !== user.id) {
            return {
                status: false,
                message: "Unauthorized"
            };
        }

        // ONLY APPLIED APPLICATION CAN BE WITHDRAWN
        if (application.status !== "applied") {
            return {
                status: false,
                message: "This application cannot be withdrawn."
            };
        }

        // WITHDRAW APPLICATION
        await Application.findByIdAndUpdate(
            applicationId,
            { status: "withdrawn" }
        );

        revalidatePath('/candidate/application')
        return {
            status: true,
            message: "Application withdrawn successfully."
        };

    } catch (error) {
        return {
            status: false,
            message: error.message || "Something went wrong."
        };
    }
}

// UPDATE APPLICATION STATUS ACTION

export async function UpdateApplicationStatusAction(applicationId, status) {
  try {
    const user = await CurrentUser();

    if (!user) {
      return {
        status: false,
        message: "Unauthorized",
      };
    }

    const recruiter = await RoleChecker("recruiter");

    if (!recruiter) {
      return {
        status: false,
        message: "Unauthorized",
      };
    }

    await connectDB();

    const recruiterProfile = await RecruiterProfile.findOne({
      user: user.id,
    });

    if (!recruiterProfile) {
      return {
        status: false,
        message: "Recruiter profile not found.",
      };
    }

    const application = await Application.findById(applicationId);

    if (!application) {
      return {
        status: false,
        message: "Application not found.",
      };
    }

    const job = await Job.findOne({
      _id: application.job,
      company: recruiterProfile._id,
    });

    if (!job) {
      return {
        status: false,
        message: "Unauthorized.",
      };
    }

    application.status = status;

    await application.save();

    revalidatePath(`/recruiter/application/applicants`);

    return {
      status: true,
      message: "Application status updated successfully.",
    };

  } catch (error) {
    console.log(error);

    return {
      status: false,
      message: error.message || "Something went wrong.",
    };
  }
}