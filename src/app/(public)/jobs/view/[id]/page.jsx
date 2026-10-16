import { Job } from "@/models/job.model";
import {
  Bookmark,
  BookmarkCheck,
  BriefcaseBusinessIcon,
  IndianRupee,
  Laptop,
  MapPin,
} from "lucide-react";
import JopApplyButton from "@/components/buttons/JobApplyButton";
import { Application } from "@/models/application.model";
import { CurrentUser } from "@/lib/current-user";
import Image from "next/image";

export default async function ViewJob({ params }) {
  const { id } = await params;

  let application;

  // FETCH JOB DETAILS

  const job = await Job.findById(id).populate("company").lean();

  // console.log("jobDetail: ", job);

  // GET CURRENT USER

  const user = await CurrentUser();
  // FETCH APPLICATION
  if (user) {
    application = await Application.find({ user: user.id });
  }

  return (
    <div className="flex flex-col p-2.5 relative capitalize bg-white text-[12px] sm:text-[14px]   ">
      <div className="flex items-center gap-1.5 p-2.5 border-b border-outlined ">
        <div className="bg-white w-[40px] h-[40px] rounded-[5px] relative overflow-hidden">
          <Image
            src={job?.company?.companyLogo?.url}
            fill
            placeholder="blur"
            blurDataURL={job?.company?.companyLogo?.url}
            alt="logo"
          />
        </div>
        <div className="flex flex-col ">
          <span className="font-semibold text-[1rem] sm:text-[1.3rem]">{job?.jobTitle}</span>
          <span>{job?.company?.companyName}</span>
        </div>
      </div>
      <div className="flex flex-col p-2.5 border-b border-outlined gap-2  ">
        <span className="capitalize text-black font-semibold">
          Job Description
        </span>
        <p className="normal-case"  >{job?.jobDescription}</p>
      </div>

      <div className="flex flex-col border-b border-outlined p-2.5 gap-2  ">
        <span className=" text-black font-semibold ">
          Role and Responsibilities
        </span>
        <ul className=" flex flex-col normal-case ">
          {job?.jobResponsibilities?.map((r, index) => {
            return (
              <li key={index} className="list-disc">
                {r}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex flex-col border-b border-outlined p-2.5  gap-2  capitalize ">
        <span className=" text-black font-semibold ">
          Minimun Qualification
        </span>
        <span>{job?.jobQualification}</span>
      </div>

      <div className="flex flex-col border-b border-outlined p-2.5  gap-2 capitalize">
        <span className=" text-black font-semibold ">Required Skills</span>
        <div className="flex flex-wrap gap-2.5 py-1.5">
          {job?.jobSkills?.map((skill, index) => {
            return (
              <span
                className="flex items-center justify-center text-black text-[0.8rem] rounded-full px-2 py-0.5 bg-blue-100 "
                key={index}>
                {skill}
              </span>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col border-b border-outlined p-2.5  gap-5  capitalize ">
        <span className="text-black font-semibold">Job overview</span>
        <div className="flex flex-wrap   gap-10  ">
          <div className="flex gap-1.5">
            <span className="min-h-fit flex items-center justify-center bg-blue-100 p-2.5 rounded-[10px]">
              <MapPin size={17}></MapPin>
            </span>
            <div className="flex flex-col ">
              <span className="text-zinc-500 text-[12px] uppercase font-semibold">
                Location
              </span>
              <span className="font-semibold">{job?.jobLocation}</span>
            </div>
          </div>
          <div className="flex gap-1.5">
            <span className="min-h-fit flex items-center justify-center bg-blue-100 p-2.5 rounded-[10px]">
              <Laptop size={17}></Laptop>
            </span>
            <div className="flex flex-col ">
              <span className="text-zinc-500 text-[12px] uppercase font-semibold">
                Mode
              </span>
              <span className="font-semibold">{job?.jobMode}</span>
            </div>
          </div>
          <div className="flex gap-1.5">
            <span className="min-h-fit flex items-center justify-center bg-blue-100 p-2.5 rounded-[10px]">
              <BriefcaseBusinessIcon size={17}></BriefcaseBusinessIcon>
            </span>
            <div className="flex flex-col ">
              <span className="text-zinc-500 text-[12px] uppercase font-semibold">
                Type
              </span>
              <span className="font-semibold">{job?.jobType}</span>
            </div>
          </div>
          <div className="flex gap-1.5">
            <span className="min-h-fit flex items-center justify-center bg-blue-100 p-2.5 rounded-[10px]">
              <IndianRupee size={17}></IndianRupee>
            </span>
            <div className="flex flex-col ">
              <span className="text-zinc-500 text-[12px] uppercase font-semibold">
                Salary
              </span>
              <span className="font-semibold">{job?.jobSalary} LPA</span>
            </div>
          </div>
        </div>
      </div>

      {user?.role === "candidate" && (
        <JopApplyButton
          jobTitle={job.jobTitle}
          jobId={job._id.toString()}
          jobApplications={JSON.parse(
            JSON.stringify(application),
          )}></JopApplyButton>
      )}
    </div>
  );
}
