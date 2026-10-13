
import AccessDenied from "@/components/AccessDenied";
import JobForm from "@/components/forms/JobForm";
import { CurrentUser, RoleChecker } from "@/lib/current-user";
import connectDB from "@/lib/db";
import { redirect } from "next/navigation";

export default async function CreateJob() {
  

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


  return (
    <div className="flex w-full h-dvh items-center justify-center bg-background">
      <JobForm></JobForm>
    </div>
  );
}
