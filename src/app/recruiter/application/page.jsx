import { CurrentUser, RoleChecker } from "@/lib/current-user";
import connectDB from "@/lib/db";
import { Application } from "@/models/application.model";
import { Job } from "@/models/job.model";
import { RecruiterProfile } from "@/models/recruiter.profile.model";
import { User } from "@/models/user.model";
import { Resume } from "@/models/resume.model";

import AccessDenied from "@/components/AccessDenied";
import ApplicationsTable from "@/components/table/ApplicationsTable";
import { redirect } from "next/navigation";

export default async function RecruiterApplication() {
  //CONNECT DB
  await connectDB();
  // CHECK CURRENT USER
  const user = await CurrentUser();
  if (!user) {
    redirect("/auth/login");
  }
  // CHECK ROLE

  const recruiter = RoleChecker(user, "recruiter");
  if (!recruiter) {
    return <AccessDenied></AccessDenied>;
  }

  // FETCH APPLICATIONS
  const recruiterProfile = await RecruiterProfile.findOne({
    user: user.id,
  });

  const jobs = await Job.find({
    company: recruiterProfile?._id,
  }).select("_id jobTitle");

  const jobIds = jobs.map((job) => job._id);

  const applications = await Application.find({
    job: { $in: jobIds },
  })
    .populate({
      path: "job",
      select: "jobTitle",
    })
    .populate({
      path: "user",
      select: "name email",
    })
    .populate({
      path: "resume",
      select: "resume",
    })
    .lean();

  // TOTAL APPLICANTS

  const plainApplications = JSON.parse(JSON.stringify(applications));

  const totalApplications = await Application.countDocuments({
    job: { $in: jobIds },
  });
  return (
    <ApplicationsTable applications={plainApplications}></ApplicationsTable>
  );
}
