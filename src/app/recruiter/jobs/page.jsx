import AccessDenied from "@/components/AccessDenied";
import JobsTable from "@/components/table/JobsTable";
import { CurrentUser, RoleChecker } from "@/lib/current-user";
import connectDB from "@/lib/db";
import { Job } from "@/models/job.model";
import { RecriuterProfile } from "@/models/recruiter.profile.model";
import { redirect } from "next/navigation";

export default async function RecruiterJobs({ searchParams }) {
  // CONNECT DB
  await connectDB();

  // GET CUREENT USER

  const user = await CurrentUser();

  if (!user) redirect("/auth/login");

  // CHECK ROLE

  const recruiter =  RoleChecker(user,"recruiter");

  if (!recruiter) return <AccessDenied></AccessDenied>;

// FILTER JOBS

    const params = await searchParams;

    const search = params?.search || "";
    const jobMode = params?.jobMode || "";
    const jobType = params?.jobType || "";
    const jobCategory = params?.jobCategory || "";
    const jobSalary = params?.jobSalary || "";
    const jobLocation = params?.jobLocation || "";

  

    const query = {};

    if (search) {
      query.jobTitle = {
        $regex: search,
        $options: "i",
      };
    }

    if (jobMode) {
      query.jobMode = jobMode;
    }

    if (jobType) {
      query.jobType = jobType;
    }
    if (jobCategory) {
      query.jobCategory = jobCategory;
    }
    if (jobLocation) {
      query.jobLocation = jobLocation;
    }
    if (jobSalary) {
      query.jobSalary = { $gte: Number(jobSalary) };
    }

  

  // FETCH JOBS
  const jobs = await Job.find({ user: user.id, ...query }).populate("company").lean();

  // TOTAL JOBS 

  const totalJobs = await Job.countDocuments({ user: user.id, ...query });

  return <JobsTable jobs={JSON.parse(JSON.stringify(jobs))} totalJobs={totalJobs}></JobsTable>;
}
