import AccessDenied from "@/components/AccessDenied";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import { CurrentUser, RoleChecker } from "@/lib/current-user";
import connectDB from "@/lib/db";
import { Job } from "@/models/job.model";
import { RecruiterProfile } from "@/models/recruiter.profile.model";
import { User } from "@/models/user.model";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  // CONNECT DB
  await connectDB();

  // CHECK CURRENT USER
  const user = await CurrentUser();
  if (!user) redirect("/auth/login");

  // CHECK ROLE
  const candidate = RoleChecker(user, "admin");
  if (!candidate) return <AccessDenied></AccessDenied>;

  // FETCH DASHBOARD DATA

  // TOTAL CANDIDATES
  const totalCandidates = await User.countDocuments({ role: "candidate" });
  // TOTAL COMPANIES
  const totalCompanies = await User.countDocuments({ role: "recruiter" });
  // TOTAL JOBS
  const totalJobs = await Job.countDocuments();

  const dashboardData = {
    totalCandidates,
    totalCompanies,
    totalJobs,
  };
  return <AdminDashboard dashboardData={dashboardData}></AdminDashboard>;
}
