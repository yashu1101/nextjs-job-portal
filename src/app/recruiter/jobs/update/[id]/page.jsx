import AccessDenied from "@/components/AccessDenied";
import JobForm from "@/components/forms/JobForm";
import { CurrentUser, RoleChecker } from "@/lib/current-user";
import connectDB from "@/lib/db";
import { Job } from "@/models/job.model";
import { notFound, redirect } from "next/navigation";

export default async function UpdateJob({ params }) {
  // GET JOB ID FROM PARAMS
  const { id } = await params;

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

  // FETCH JOB + CHECK OWNERSHIP
  const job = await Job.findOne({
    user: user.id,
    _id: id,
  }).lean();

  if (!job) {
    notFound();
  }

  return (
    <div className="flex w-full h-dvh items-center justify-center bg-background">
      <JobForm job={JSON.parse(JSON.stringify(job))} mode="update" />
    </div>
  );
}
