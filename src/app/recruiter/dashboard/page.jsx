import AccessDenied from "@/components/AccessDenied";
import RecruiterDashboard from "@/components/dashboard/RecruiterDashboard";
import { CurrentUser, RoleChecker } from "@/lib/current-user";
import connectDB from "@/lib/db";
import { Application } from "@/models/application.model";
import { Job } from "@/models/job.model";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  // CONNECT DB
  await connectDB();

  // CHECK CURRENT USER
  const user = await CurrentUser();
  if (!user) redirect("/auth/login");

  // CHECK ROLE
  const recruiter =  RoleChecker(user,"recruiter");
  if (!recruiter) return <AccessDenied></AccessDenied>;

  // FETCH DASHBOARD DATA

  // FETCH TOTAL  JOBS

  const totalJobs = await Job.countDocuments({ user: user.id });

  const jobs = await Job.find({
    user: user.id,
  }).select("_id");

  const jobIds = jobs.map((job) => job._id);

  const totalApplications = await Application.countDocuments({
    job: { $in: jobIds },
  });

  const totalApplied = await Application.countDocuments({
    job: { $in: jobIds },
    status: "applied",
  });

  const totalShortlisted = await Application.countDocuments({
    job: { $in: jobIds },
    status: "shortlisted",
  });

  const totalRejected = await Application.countDocuments({
    job: { $in: jobIds },
    status: "rejected",
  });

  const totalHired = await Application.countDocuments({
    job: { $in: jobIds },
    status: "hired",
  });

  const totalWithdrawn = await Application.countDocuments({
  job: { $in: jobIds },
  status: "withdrawn",
});

  const dashboardData = {
    totalJobs,
    totalApplications,
    totalApplied,
    totalShortlisted,
    totalRejected,
    totalHired,
    totalWithdrawn,
  };

  console.log(dashboardData)
  return (
    <RecruiterDashboard dashboardData={dashboardData}></RecruiterDashboard>
  );
}
