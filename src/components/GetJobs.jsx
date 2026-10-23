"use client";

import { SaveJobAction } from "@/actions/job.action";
import {
  Bookmark,
  BriefcaseBusiness,
  IndianRupee,
  Laptop,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { joblogoPlaceholder } from "@/util/image-provider";
import { useState } from "react";

export default function GetJobs({ jobs, savedJobIds, currentUser }) {
  const [savedJobs, setSavedJobs] = useState(savedJobIds);

  async function handleSave(jobId) {
    if (!currentUser) return;

    const result = await SaveJobAction(jobId);

    if (result.status) {
      setSavedJobs((prev) => {
        const id = jobId.toString();

        if (result.isSaved) {
          return [...prev, id];
        }

        return prev.filter((savedId) => savedId !== id);
      });
    }
  }
  return (
    <>
      {jobs.map((job, index) => {
        const isSaved = savedJobs.includes(job._id.toString());

        return (
          <div key={index} className="relative">
            {currentUser && (
              <Bookmark
                size={20}
                stroke={isSaved ? "#155dfc" : "#000"}
                className="absolute right-2.5 top-2.5 cursor-pointer"
                fill={isSaved ? "#155dfc" : "none"}
                onClick={() => handleSave(job?._id)}></Bookmark>
            )}
            <Link href={`/jobs/view/${job?._id} `} className="capitalize">
              <div className=" flex flex-col bg-gradient p-3  gap-2 rounded-[10px] ">
                <div className="flex items-center gap-1.5">
                  <div className="bg-white w-[40px] h-[40px] rounded-[10px] relative overflow-hidden">
                    <Image
                      src={job?.company?.companyLogo?.url || joblogoPlaceholder}
                      fill
                      alt="logo"
                    />
                  </div>
                  <div className="flex flex-col ">
                    <span className="font-semibold">{job?.jobTitle}</span>

                    <span className="text-[12px]">
                      {job?.company?.companyName}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2.5 mt-2 flex-wrap font-semibold ">
                  <div className="flex text-[12px] items-center  border px-1 py-0.5 rounded-[10px] ">
                    {" "}
                    <IndianRupee size={14}></IndianRupee>{" "}
                    {`${job?.jobSalary} LPA`}
                  </div>
                  <div className="flex text-[12px] items-center gap-1 border px-1 py-0.5 rounded-[10px] ">
                    {" "}
                    <MapPin size={14}></MapPin> {job?.jobLocation}
                  </div>
                  <div className="flex text-[12px] items-center gap-1 border px-1 py-0.5 rounded-[10px] ">
                    <Laptop size={15}></Laptop> {job?.jobMode}
                  </div>
                  <div className="flex text-[12px] items-center gap-1 border px-1 py-0.5 rounded-[10px] ">
                    {" "}
                    <BriefcaseBusiness size={15}></BriefcaseBusiness>{" "}
                    {job?.jobType}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </>
  );
}
