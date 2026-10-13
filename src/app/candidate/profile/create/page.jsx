import AccessDenied from "@/components/AccessDenied";
import CandidateProfileForm from "@/components/forms/CandidateProfileForm";
import { CurrentUser, RoleChecker } from "@/lib/current-user";
import connectDB from "@/lib/db";
import { redirect } from "next/navigation";

export default async function CreateCandidateProfile() {
  // CONNECT DB
  await connectDB();

  // GET CURRENT USER
  const user = await CurrentUser();

  // REDIRECT TO LOGIN PAGE
  if (!user) {
    redirect("/auth/login");
  }

  // CHECK ROLE
  const candidate =  RoleChecker(user, "candidate");

  if (!candidate) {
    return <AccessDenied />;
  }

  return <CandidateProfileForm></CandidateProfileForm>;
}
