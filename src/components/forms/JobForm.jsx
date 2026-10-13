"use client";
import { JobCreateAction, JobUpdateAction } from "@/actions/job.action";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

export default function JobForm({ job, mode = "create" }) {
  const router = useRouter();

  const isUpdate = mode === "update";

  // USE ACTION STATE

  const [state, dispatchAction, isPending] = useActionState(
    async (previousState, formData) => {
      if (isUpdate) {
        return await JobUpdateAction(previousState, job._id, formData);
      }
      return await JobCreateAction(previousState, formData);
    },
    null,
  );

  // REDIRECT TO JOBS PAGE AFTER CREATING OR UPDATING JOB

  useEffect(() => {
    if (state?.status) {
      router.push("/recruiter/jobs");
    }
  }, [state?.status]);

  return (
    <div className="flex flex-col  w-full max-w-[500] px-5 bg-white ">
      <span className="sm:text-2xl font-semibold text-2xl text-center my-6">
        {isUpdate ? "Update Job" : "Create New Job"}
      </span>
      <div className="max-h-[550px] overflow-scroll scrollbar-none">
        <form action={dispatchAction} className="flex flex-col gap-2.5">
          {/* Job Title */}
          <div className="flex flex-col items-baseline w-full">
            <label
              className=" font-semibold py-1.25 px-1.25 text-[12px] sm:text-[14px]"
              htmlFor="jobTitle">
              Job Title
            </label>

            <input
              className="w-full border border-zinc-300 py-2.5 px-2.5 rounded-[10px] text-[12px] sm:text-[14px]"
              type="text"
              name="jobTitle"
              id="jobTitle"
              defaultValue={job?.jobTitle || ""}
            />
          </div>

          {/* Job Category */}
          <div className="flex flex-col items-baseline w-full">
            <label
              className=" font-semibold py-1.25 px-1.25 text-[12px] sm:text-[14px]"
              htmlFor="jobCategory">
              Job Category
            </label>

            <select
              className="w-full border bg-white border-zinc-300 py-2.5 px-2.5 rounded-[10px] text-[12px] sm:text-[14px]"
              name="jobCategory"
              id="jobCategory"
              defaultValue={job?.jobCategory || ""}>
              <option value="">Select Job Category</option>
              <option value="web-development">Web Development</option>
              <option value="app-development">App Development</option>
              <option value="designer">Designer</option>
              <option value="software-engineer">Software Engineer</option>
              <option value="devops-and-cloud">DevOps and Cloud</option>
              <option value="ai-engineer">Ai Engineer</option>
              <option value="cyber-security">Cyber Security</option>
            </select>
          </div>

          {/* Job Type */}
          <div className="flex flex-col items-baseline w-full">
            <label
              className=" font-semibold py-1.25 px-1.25 text-[12px] sm:text-[14px]"
              htmlFor="jobType">
              Job Type
            </label>

            <select
              className="w-full border bg-white border-zinc-300 py-2.5 px-2.5 rounded-[10px] text-[12px] sm:text-[14px]"
              name="jobType"
              id="jobType"
              defaultValue={job?.jobType || ""}>
              <option value="">Select Job Type</option>
              <option value="full-time">Full-Time</option>
              <option value="part-time">Part-Time</option>
            </select>
          </div>

          {/* Job Mode */}
          <div className="flex flex-col items-baseline w-full">
            <label
              className=" font-semibold py-1.25 px-1.25 text-[12px] sm:text-[14px]"
              htmlFor="jobMode">
              Job Mode
            </label>

            <select
              className="w-full border bg-white border-zinc-300 py-2.5 px-2.5 rounded-[10px] text-[12px] sm:text-[14px]"
              name="jobMode"
              id="jobMode"
              defaultValue={job?.jobMode || ""}>
              <option value="">Select Job Mode</option>
              <option value="remote">Remote</option>
              <option value="on-site">On-site</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>

          {/* Qualification */}
          <div className="flex flex-col items-baseline w-full">
            <label
              className=" font-semibold py-1.25 px-1.25 text-[12px] sm:text-[14px]"
              htmlFor="jobQualification">
              Minimum Qualification
            </label>

            <select
              className="w-full border bg-white border-zinc-300 py-2.5 px-2.5 rounded-[10px] text-[12px] sm:text-[14px]"
              name="jobQualification"
              id="jobQualification"
              defaultValue={job?.jobQualification || ""}>
              <option value="">Select Minimum Qualification</option>
              <option value="btech">B.Tech</option>
              <option value="bsc">B.Sc</option>
              <option value="mca">MCA</option>
              <option value="12th">12TH</option>
              <option value="10th">10TH</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Skills */}
          <div className="flex flex-col items-baseline w-full">
            <label
              className=" font-semibold py-1.25 px-1.25 text-[12px] sm:text-[14px]"
              htmlFor="jobSkills">
              Required Skills
            </label>

            <input
              className="w-full border border-zinc-300 py-2.5 px-2.5 rounded-[10px] text-[12px] sm:text-[14px]"
              type="text"
              name="jobSkills"
              id="jobSkills"
              required
              defaultValue={job?.jobSkills?.join(", ") || ""}
              placeholder="Each skill should separated by ( , )"
            />
          </div>

          {/* Salary */}
          <div className="flex flex-col items-baseline w-full">
            <label
              className=" font-semibold py-1.25 px-1.25 text-[12px] sm:text-[14px]"
              htmlFor="jobSalary">
              Annual Salary
            </label>

            <input
              className="w-full border border-zinc-300 py-2.5 px-2.5 rounded-[10px] text-[12px] sm:text-[14px]"
              type="number"
              name="jobSalary"
              id="jobSalary"
              min="0"
              max="100"
              step="0.1"
              required
              placeholder="Enter salary in LPA"
              defaultValue={job?.jobSalary || ""}
            />
          </div>

          {/* Location */}
          <div className="flex flex-col items-baseline w-full">
            <label
              className=" font-semibold py-1.25 px-1.25 text-[12px] sm:text-[14px]"
              htmlFor="jobLocation">
              Job Location
            </label>

            <input
              className="w-full border border-zinc-300 py-2.5 px-2.5 rounded-[10px] text-[12px] sm:text-[14px]"
              type="text"
              name="jobLocation"
              id="jobLocation"
              required
              defaultValue={job?.jobLocation || ""}
              placeholder="job office location"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col items-baseline w-full">
            <label
              className=" font-semibold py-1.25 px-1.25 text-[12px] sm:text-[14px]"
              htmlFor="jobDescription">
              Job Description
            </label>

            <input
              className="w-full border border-zinc-300 py-2.5 px-2.5 rounded-[10px] text-[12px] sm:text-[14px]"
              type="text"
              name="jobDescription"
              id="jobDescription"
              required
              defaultValue={job?.jobDescription || ""}
              placeholder="Describe about job"
            />
          </div>
          {/* Roles and Responsibilities */}
          <div className="flex flex-col items-baseline w-full">
            <label
              className=" font-semibold py-1.25 px-1.25 text-[12px] sm:text-[14px]"
              htmlFor="jobResponsibilities">
              Roles and Responsibilities
            </label>

            <textarea
              className="w-full border border-zinc-300 py-2.5 px-2.5 rounded-[10px] text-[12px] sm:text-[14px]"
              type="text"
              name="jobResponsibilities"
              id="jobResponsibilities"
              required
              defaultValue={job?.jobResponsibilities || ""}
              placeholder="Each role and responsibility should separated by ( , )"
            />
          </div>

          {isUpdate ? (
            <button
              className={`w-full flex gap-2.5 items-center justify-center  ${isPending ? "bg-green-500 text-black pointer-events-none " : "bg-blue-600 text-white "} hover:bg-blue-700 py-2.5 px-2.5 rounded-[10px] mt-1.5 mb-2.5 transition-all duration-500`}
              type="submit">
              {isPending ? (
                <>
                  {" "}
                  Updating Job..{" "}
                  <Loader size={15} className="animate-spin"></Loader>
                </>
              ) : (
                "Update Job"
              )}
            </button>
          ) : (
            <button
              className={`w-full flex gap-2.5 items-center justify-center  ${isPending ? "bg-green-500 text-black pointer-events-none " : "bg-blue-600 text-white "} hover:bg-blue-700 py-2.5 px-2.5 rounded-[10px] mt-1.5 mb-2.5 transition-all duration-500`}
              type="submit">
              {isPending ? (
                <>
                  {" "}
                  Posting Job..{" "}
                  <Loader size={15} className="animate-spin"></Loader>
                </>
              ) : (
                "Post Job"
              )}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
