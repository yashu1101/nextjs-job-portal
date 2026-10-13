import FilterBar from "@/components/FilterBar";
import GetJobs from "@/components/GetJobs";
import Searchbar from "@/components/Searchbar";
import ToggleFilterbarButton from "@/components/buttons/ToggleFilterbarButton";
import { CurrentUser } from "@/lib/current-user";
import connectDB from "@/lib/db";
import { Job } from "@/models/job.model";
import { RecruiterProfile } from "@/models/recruiter.profile.model";
import { SaveJob } from "@/models/save.job.model";

export default async function Jobs({ params, searchParams }) {
  const { category } = await params;

  console.log(category);

  let plainJobs = [];
  let savedJobIds = [];
  let user;

  try {
    // CONNECT JOB
    await connectDB();

    // FILTER JOBS

    const params = await searchParams;

    const search = params?.search || "";
    const jobMode = params?.jobMode || "";
    const jobType = params?.jobType || "";
    const jobCategory = params?.jobCategory || "";

    const query = {};

    if (search) {
      query.jobTitle = {
        $regex: search,
        $options: "i",
      };
    }

    if (jobMode) {
      query.jobMode = jobMode;
    }

    if (jobType) {
      query.jobType = jobType;
    }

    // FETCH JOBS
    const jobs = await Job.find({ jobCategory: category, ...query })
      .populate("company")
      .lean();
    //GET CURRENT USER
    user = await CurrentUser();

    // FETCH SAVED JOBS

    if (user) {
      const savedJobs = await SaveJob.find({ user: user.id })
        .select("job")
        .lean();

      savedJobIds = savedJobs.map((saved) => saved.job.toString());
    }

    plainJobs = JSON.parse(JSON.stringify(jobs));
  } catch (error) {
    return <h3>Somthing went wrong</h3>;
  }

  const totalJobs = plainJobs.length;

  return (
    <div className="flex flex-col py-10 pb-5 relative">
      <div className="flex items-center max-w-125 w-full justify-between gap-2.5">
        <Searchbar
          padding={"sm:p-3.5 p-2.5 "}
          placeholder={"search jobs"}
          border={"border border-violet-800"}></Searchbar>

        <ToggleFilterbarButton></ToggleFilterbarButton>
      </div>

       <div className="mt-5 mb-5 sm:text-2xl flex flex-col text-[1.3rem] font-medium ">
        <span className="font-bold capitalize " >Find your dream job</span>
        <span className="text-[14px] text-gray-500" >Total {totalJobs} jobs are available</span>
      </div>

      <div className="flex flex-col gap-2.5 w-full max-w-125 ">
        <GetJobs
          jobs={plainJobs}
          savedJobIds={savedJobIds}
          currentUser={user}></GetJobs>
      </div>
      <FilterBar></FilterBar>
    </div>
  );
}
