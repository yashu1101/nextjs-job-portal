import AccessDenied from "@/components/AccessDenied";
import GetJobs from "@/components/GetJobs";
import { CurrentUser, RoleChecker } from "@/lib/current-user";
import connectDB from "@/lib/db";
import { Job } from "@/models/job.model";
import { SaveJob } from "@/models/save.job.model";
import { redirect } from "next/navigation";

export default async function SavedJobs() {
  await connectDB();

  // GET CURRENT USER
  const user = await CurrentUser();
  if (!user) {
    redirect("/auth/login");
  }

  // CHECK ROLE

  const candidate =  RoleChecker(user,"candidate");
  if (!candidate) {
    return <AccessDenied></AccessDenied>;
  }

  // FETCH SAVED JOBS
  const jobs = await SaveJob.find({ user: user.id })
    .populate({
      path: "job",
      populate: {
        path: "company",
      },
    })
    .lean();

  const savedJobIds = jobs.map((job) => job.job._id.toString());
  const plainJobs = jobs.map((job) => job.job);

  console.log(plainJobs);
  return (
    <div className="flex flex-col py-10 pb-5 capitalize">
      <div className="mt-5 mb-5 sm:text-2xl text-[1.3rem] font-medium ">
        <span>{`Total ${jobs?.length} Saved Jobs`}</span>
      </div>

      <div className="flex flex-col gap-2.5 w-full max-w-125 ">
        <GetJobs
          jobs={JSON.parse(JSON.stringify(plainJobs))}
          savedJobIds={savedJobIds}
          currentUser={user}></GetJobs>
      </div>
    </div>
  );
}
