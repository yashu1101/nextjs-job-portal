import ApplicantsTable from "@/components/table/ApplicantsTable";
import Searchbar from "@/components/Searchbar";
import { CurrentUser } from "@/lib/current-user";
import connectDB from "@/lib/db";

import { Application } from "@/models/application.model";
import { Job } from "@/models/job.model";
import { RecruiterProfile } from "@/models/recruiter.profile.model";
import { User } from "@/models/user.model";
import { Resume } from "@/models/resume.model";
import { notFound, redirect } from "next/navigation";

export default async function RecruiterApplicants({ params, searchParams }) {
  const { id } = await params;
  const filters = await searchParams;
  const search = filters?.search?.trim() || "";

  const user = await CurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  if (user.role !== "recruiter") {
    notFound();
  }

  await connectDB();

  const recruiterProfile = await RecruiterProfile.findOne({
    user: user.id,
  });

  if (!recruiterProfile) {
    notFound();
  }

  const job = await Job.findOne({
    _id: id,
    company: recruiterProfile._id,
  });

  if (!job) {
    notFound();
  }

  // Fetch applicants for this job
  let applicants = await Application.find({ job: id })
    .populate("user", "name email")
    .populate("resume", "resume")
    .lean();

  // Search by candidate name or email
  if (search) {
    const searchRegex = new RegExp(
      search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
      "i",
    );

    applicants = applicants.filter(
      (application) =>
        searchRegex.test(application.user?.name || "") ||
        searchRegex.test(application.user?.email || ""),
    );
  }

  const plainApplicants = JSON.parse(JSON.stringify(applicants));

  // Total applicants for this job
  const totalApplicants = await Application.countDocuments({
    job: id,
  });

  return (
    <>
      <ApplicantsTable
        applicants={plainApplicants}
        totalApplicants={totalApplicants}
      />
    </>
  );
}
