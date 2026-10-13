import { GetProfile } from "@/actions/profile.action";
import AccessDenied from "@/components/AccessDenied";
import RecruiterProfileForm from "@/components/forms/RecruiterProfileForm";
import { CurrentUser, RoleChecker } from "@/lib/current-user";
import connectDB from "@/lib/db";
import { notFound, redirect } from "next/navigation";

export default async function UpdateRecruiterProfile() {
  // CONNECT DB
  await connectDB();

  // GET CURRENT USER
  const user = await CurrentUser();

  // REDIRECT TO LOGIN PAGE
  if (!user) {
    redirect("/auth/login");
  }

  // CHECK ROLE
  const recruiter =  RoleChecker(user,"recruiter");

  if (!recruiter) {
    return <AccessDenied />;
  }

  // FETCH JOB
  const data = await GetProfile();

  if (!data?.profile) {
    notFound();
  }


  return (
    <div className="flex w-full h-dvh items-center justify-center bg-background">
      <RecruiterProfileForm
        mode="update"
        profile={data?.profile}></RecruiterProfileForm>
    </div>
  );
}
