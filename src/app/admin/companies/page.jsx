import AccessDenied from "@/components/AccessDenied";
import RecruitersTable from "@/components/table/RecruitersTable";
import { CurrentUser, RoleChecker } from "@/lib/current-user";
import connectDB from "@/lib/db";
import { RecruiterProfile } from "@/models/recruiter.profile.model";
import { User } from "@/models/user.model";
import { redirect } from "next/navigation";

export default async function AdminCompanies() {
   // CONNECT DB
  await connectDB();

  // GET CURRENT USER

  const user = await CurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  // CHECK ROLE

  const admin = RoleChecker(user, "admin");

  if (!admin) {
    return <AccessDenied></AccessDenied>;
  }

  // FETCH ALL CANDIDATES
  const recruiters = await RecruiterProfile.find().populate('user','createdAt');



  return (
    <RecruitersTable
      companies={JSON.parse(JSON.stringify(recruiters))}></RecruitersTable>
  );
}
