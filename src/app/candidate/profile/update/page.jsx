import { GetProfile } from "@/actions/profile.action";
import AccessDenied from "@/components/AccessDenied";
import CandidateProfileForm from "@/components/forms/CandidateProfileForm";
import { CurrentUser, RoleChecker } from "@/lib/current-user";
import connectDB from "@/lib/db";
import { notFound, redirect } from "next/navigation";

export default async function UpdateCandidateProfile() {
  // CONNECT DB
  await connectDB();

  // GET CURRENT USER
  const user = await CurrentUser();

  // REDIRECT TO LOGIN PAGE
  if (!user) {
    redirect("/auth/login");
  }

  // CHECK ROLE
  const candidate =  RoleChecker(user,"candidate");

  if (!candidate) {
    return <AccessDenied />;
  }

  // FETCH JOB
  const data = await GetProfile();

  if (!data?.profile) {
    notFound();
  }


  return (
    <div className="flex w-full h-dvh items-center justify-center bg-background">
      <CandidateProfileForm
        mode="update"
        profile={data?.profile}></CandidateProfileForm>
    </div>
  );
}
