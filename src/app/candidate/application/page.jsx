import AccessDenied from "@/components/AccessDenied";
import Searchbar from "@/components/Searchbar";
import { CurrentUser, RoleChecker } from "@/lib/current-user";

import { Application } from "@/models/application.model";
import { Job } from "@/models/job.model";
import { date } from "@/util/date-formator";
import { BriefcaseBusiness, Filter, Laptop, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
export default async function ApplicationPage() {
  // GET CURRENT USER
  const user = await CurrentUser();
  if (!user) {
    redirect("/auth/login");
  }

  // CHECK ROLE

  const candidate = RoleChecker(user, "candidate");
  if (!candidate) {
    return <AccessDenied></AccessDenied>;
  }

  // FETCH APPLICATION
  const applications = await Application.find({ user: user?.id })
    .populate({
      path: "job",
      populate: {
        path: "company",
      },
    })
    .lean();

  const planeApplication = JSON.parse(JSON.stringify(applications));

  return (
    <div className="flex flex-col py-2.5 pb-5">
      <div className="mt-5 mb-5 sm:text-2xl text-[1.3rem] font-medium ">
        <span>Your Applications</span>
      </div>

      <div className="flex flex-col gap-4.5 w-full max-w-125 capitalize text-[12px] sm:text-[14px]">
        {planeApplication.map((application, index) => {
          return (
            <Link
              href={`/jobs/view/${application?.job?._id}`}
              className=" flex flex-col bg-gradient   gap-2 rounded-[10px] relative overflow-hidden outline-1 outline-[#6969691c] "
              key={index}>
              <div className=" flex flex-col  p-2.5  gap-2  ">
                <div className="flex items-center gap-1.5">
                  <div className="bg-white w-[35px] h-[35px] rounded-[5px] relative ">
                    <Image
                      src={application?.job?.company?.companyLogo?.url}
                      fill
                      alt="logo"
                    />
                  </div>
                  <div className="flex flex-col ">
                    <span className="font-semibold text-black text-[14px]">
                      {application?.job?.jobTitle}
                    </span>
                    <span className="text-[12px]">
                      {application?.job?.company?.companyName}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2.5 mt-2 flex-wrap">
                  <div className="flex text-[12px] items-center gap-1 border px-2 py-1 rounded-[10px] ">
                    {" "}
                    <MapPin size={15}></MapPin> {application?.job?.jobLocation}
                  </div>
                  <div className="flex text-[12px] items-center gap-1 border px-2 py-1 rounded-[10px] ">
                    <Laptop size={15}></Laptop> {application?.job?.jobMode}
                  </div>
                  <div className="flex text-[12px] items-center gap-1 border px-2 py-1 rounded-[10px] ">
                    {" "}
                    <BriefcaseBusiness size={15}></BriefcaseBusiness>{" "}
                    {application?.job?.jobType}
                  </div>
                </div>
              </div>

              <div
                className={`absolute top-2 right-2 text-[10px] font-semibold rounded-[10px] border px-2.5 py-1 ${application?.status === "applied" ? "text-orange-600" : application?.status === "shortlisted" ? "text-blue-500" : application?.status === "rejected" ? "text-red-500" : application?.status === "hired" ? "text-green-700" : application?.status === "withdrawn" ? "text-red-500" : ""} `}>
                <span>{application?.status.toUpperCase()}</span>
              </div>

              <div className="bg-black w-full flex flex-col p-2.5  flex-wrap sm:text-[14px] text-[12px]">
                <span className="text-nowrap text-gray-400 normal-case">
                  Applied on {date(application?.createdAt)}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
