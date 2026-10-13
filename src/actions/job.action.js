'use server';
import { CurrentUser, RoleChecker } from "@/lib/current-user"
import connectDB from "@/lib/db"
import { Job } from "@/models/job.model"
import { RecruiterProfile } from "@/models/recruiter.profile.model"
import { SaveJob } from "@/models/save.job.model"
import { revalidatePath } from "next/cache"

// JOB CREATE ACTION
export async function JobCreateAction(previousState, formdata) {
    try {
        const { jobTitle, jobCategory, jobType, jobMode, jobQualification, jobLocation, jobSkills, jobSalary, jobDescription, jobResponsibilities } = Object.fromEntries(formdata)
        console.log(jobResponsibilities)
        if (!jobTitle || !jobCategory || !jobType || !jobMode || !jobQualification || !jobLocation || !jobSkills || !jobSalary || !jobDescription || !jobResponsibilities) return {
            status: false,
            message: "All field are required!"
        }

        // CONNECT DATABASE

        await connectDB()
        // CHECK ROLE

        const recruiter = await RoleChecker('recruiter')
        if (!recruiter) {
            console.log('Unauthorized')
            return {

                status: false,
                message: 'Unauthorized'
            }
        }

        // GET CURRENT USER
        const user = await CurrentUser()

        // GET COMPANY LOGO

        const recruiterProfile = await RecruiterProfile.findOne({
            user: user.id
        });

        console.log("Recruiter Profile:", recruiterProfile);

        if (!recruiterProfile) {
            console.log("Recruiter profile not found")
            return {
                status: false,
                message: "Recruiter profile not found"
            }
        }

        //CREATE JOB
        const job = await Job.create({
            user: user.id,
            jobTitle,
            jobCategory,
            company: recruiterProfile._id,

            jobType,
            jobMode,
            jobQualification,
            jobLocation,
            jobSkills: jobSkills.split(',').map(s => s.trim()).filter(Boolean), // Convert comma-separated string to array
            jobSalary: Number(jobSalary),
            jobDescription,
            jobResponsibilities: jobResponsibilities.split(',').map(r => r.trim()).filter(Boolean)
        })

        if (!job) {

            console.log("Job not created")
            return {
                status: false,
                message: "Job not created"
            }
        }
        console.log("Job created successfully.")
        return {
            status: true,
            message: "Job created successfully."
        }


    } catch (error) {
        console.log(error)
        return {
            status: false,
            message: "An error occurred while creating the job."
        }
    }

}



// UPDATE JOB ACTION 
export async function JobUpdateAction(previousState, jobId, formData) {
    try {
        // CONNECT DB
        await connectDB();

        // CURRENT USER
        const user = await CurrentUser();

        if (!user) {
            return {
                status: false,
                message: "Unauthorized"
            };
        }

        // CHECK ROLE
        const recruiter = await RoleChecker("recruiter");

        if (!recruiter) {
            return {
                status: false,
                message: "Unauthorized"
            };
        }

        // FIND JOB 
        const job = await Job.findOne({
            _id: jobId,
            user: user.id
        });

        if (!job) {
            return {
                status: false,
                message: "Job not found"
            };
        }

        // GET FORM DATA
        const jobTitle = formData.get("jobTitle");
        const jobCategory = formData.get("jobCategory");
        const jobType = formData.get("jobType");
        const jobMode = formData.get("jobMode");
        const jobQualification = formData.get("jobQualification");
        const jobSkills = formData.get("jobSkills");
        const jobSalary = formData.get("jobSalary");
        const jobLocation = formData.get("jobLocation");
        const jobDescription = formData.get("jobDescription");
        const jobResponsibilities = formData.get("jobResponsibilities");
        console.log("jobResponsibilities: ", jobResponsibilities);
        // UPDATE JOB
        job.jobTitle = jobTitle;
        job.jobCategory = jobCategory;
        job.jobType = jobType;
        job.jobMode = jobMode;
        job.jobQualification = jobQualification;
        job.jobSkills = jobSkills
            .split(",")
            .map(skill => skill.trim())
            .filter(Boolean);
        job.jobSalary = Number(jobSalary);
        job.jobLocation = jobLocation;
        job.jobDescription = jobDescription;
        job.jobResponsibilities = jobResponsibilities.split(',').map(r => r.trim()).filter(Boolean);
        await job.save();

        revalidatePath("/recruiter/jobs");

        return {
            status: true,
            message: "Job updated successfully."
        };

    } catch (error) {
        console.log(error.message)
        return {
            status: false,
            message: error.message || "Something went wrong"
        };
    }
}
// DELETE JOB ACTION 


export async function JobDeleteAction(jobId) {
    try {
        // CONNECT DB
        await connectDB();

        // CURRENT USER
        const user = await CurrentUser();

        if (!user) {
            return {
                status: false,
                message: "Unauthorized"
            };
        }

        // CHECK ROLE
        const recruiter = await RoleChecker("recruiter");

        if (!recruiter) {
            return {
                status: false,
                message: "Unauthorized"
            };
        }

        // CHECK IS JOB EXIST
        const job = await Job.findOne({
            user: user.id,
            _id: jobId
        });

        if (!job) {
            return {
                status: false,
                message: "Job not found"
            };
        }

        // DELETE JOB
        await Job.findOneAndDelete({
            user: user.id,
            _id: jobId
        });

        revalidatePath("/recruiter/jobs");
        return {
            status: true,
            message: "Job deleted successfully."
        };

    } catch (error) {
        return {
            status: false,
            message: error.message || "Something went wrong"
        };
    }
}

//SAVE JOB ACTION
export async function SaveJobAction(job) {
    try {

        if (!job) return {
            status: false,
            message: "All field are required!"
        }

        // CONNECT DATABASE

        await connectDB()

        const user = await CurrentUser()

        if (!user) {
            return {
                status: false,
                message: "Unauthorized"
            };
        }

        // CHECK IF ALREDAY EXIST
        const existingSaveJob = await SaveJob.findOne({ user: user.id, job })
        if (existingSaveJob) {

            await SaveJob.deleteOne({ user: user.id, job })
            revalidatePath("/candidate/saved-jobs")
     
            return { status: true, isSaved: false, message: "Job unsaved" }
        }

        //CREATE SAVE JOB
        const saveJob = await SaveJob.create({
            job,
            user: user.id
        })

        if (!saveJob) {
            console.log("Job not saved")
            return {
                status: false,
                message: "Job not saved"
            }
        }

        revalidatePath("/candidate/saved-jobs")
        return {
            status: true,
            isSaved: true,
            message: "Job saved successfully."
        }

    } catch (error) {
        console.log(error)
        return {
            status: false,
            message: "An error occurred while saving the job."
        }
    }
}




