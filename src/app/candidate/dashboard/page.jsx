import AccessDenied from "@/components/AccessDenied";
import CandidateDashboard from "@/components/dashboard/CandidateDashboard";
import { CurrentUser, RoleChecker } from "@/lib/current-user";
import connectDB from "@/lib/db";
import { Application } from "@/models/application.model";
import { SaveJob } from "@/models/save.job.model";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  // CONNECT DB
  await connectDB();

  // CHECK CURRENT USER
  const user = await CurrentUser();
  if (!user) redirect("/auth/login");

  // CHECK ROLE
  const candidate =  RoleChecker(user,"candidate");
  if (!candidate) return <AccessDenied></AccessDenied>;

  // FETCH DASHBOARD DATA

  // FETCH TOTAL SAVED JOBS

  const totalSavedJobs = await SaveJob.countDocuments({ user: user.id });

  // FETCH TOTAL APPLICATIONS

  const totalApplications = await Application.countDocuments({ user: user.id });

  // FETCH TOTAL APPLIED APPLICATIONS
  const totalApplied = await Application.countDocuments({
    user: user.id,
    status: "applied",
  });

  // FETCH TOTAL SHORTLISTED APPLICATIONS
  const totalShortlisted = await Application.countDocuments({
    user: user.id,
    status: "shortlisted",
  });

  // FETCH TOTAL REJECTED APPLICATIONS
  const totalRejected = await Application.countDocuments({
    user: user.id,
    status: "rejected",
  });

  // FETCH TOTAL HIRED APPLICATION
  const totalHired = await Application.countDocuments({
    user: user.id,
    status: "hired",
  });

  // FETCH TOTAL WITHDRAWN APPLICATIONS
  const totalWithdrawn = await Application.countDocuments({
    user: user.id,
    status: "withdrawn",
  });

  const dashboardData = {
    totalSavedJobs,
    totalApplications,
    totalApplied,
    totalShortlisted,
    totalRejected,
    totalHired,
    totalWithdrawn,
  };
  return (
    <CandidateDashboard dashboardData={dashboardData}></CandidateDashboard>
  );
}
