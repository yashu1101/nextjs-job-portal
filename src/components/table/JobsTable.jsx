"use client";
import { JobDeleteAction } from "@/actions/job.action";
import Searchbar from "@/components/Searchbar";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";
import ToggleFilterbarButton from "../buttons/ToggleFilterbarButton";
import FilterBar from "../FilterBar";

export default function JobsTable({ jobs, totalJobs }) {


  return (
    <div className="flex flex-col gap-2.5 py-5">
      <div className="flex items-center justify-between gap-2.5 sm:text-[14px] text-[12px] ">
        <div className="flex items-center gap-2.5 w-full max-w-75">
          <Searchbar
            placeholder={"search jobs"}
            border={"border"}
            padding={"sm:p-2.5 px-2"}></Searchbar>
          <ToggleFilterbarButton></ToggleFilterbarButton>
        </div>
        <Link
          className="flex items-center justify-center font-semibold bg-blue-600 text-white p-2.5 w-25 rounded-[10px] text-nowrap  hover:bg-blue-700 transition-all duration-300 "
          href="/recruiter/jobs/create">
          Post Job
        </Link>
      </div>
      {jobs?.length === 0 ? (
        <div className="flex items-center justify-center h-[300px]">
          <span className="text-[14px] sm:text-[16px] text-gray-500">
            No jobs found. Please post a job.
          </span>
        </div>
      ) : (
        <>
          <div className="p-2.5 font-semibold">
            {" "}
            <span className=" text-left ">Total {totalJobs} jobs</span>
          </div>
          <div className="overflow-x-auto bg-white">
            <table className="table-auto sm:text-[14px] text-[12px] w-full  border border-[#80808040] rounded-[10px] overflow-hidden capitalize  ">
              <thead className="bg-blue-100 p-2.5 rounded-[10px]">
                <tr>
                  <th className="text-left p-2.5   ">Id </th>
                  <th className="text-left p-2.5   ">Title </th>
                  <th className="text-left p-2.5  ">Company</th>
                  <th className="text-left p-2.5  ">Location</th>
                  <th className="text-left p-2.5  ">Type</th>
                  <th className="text-left p-2.5  ">Duration</th>
                  <th className="text-left p-2.5  ">Salary</th>
                  <th className="text-left p-2.5  ">Action</th>
                </tr>
              </thead>
              <tbody>
                {jobs?.map((job, index) => {
                  return (
                    <tr
                      key={index}
                      className="border-b border-[#80808040] text-nowrap ">
                      <td className="p-2.5  text-blue-600 ">
                        <Link href={`/jobs/view/${job?._id}`}>
                          {" "}
                          {`${job?._id.slice(0, 4)}...${job?._id.slice(-4)}`}
                        </Link>{" "}
                      </td>
                      <td className="p-2.5   ">{job?.jobTitle}</td>
                      <td className="p-2.5  ">{job?.company?.companyName}</td>
                      <td className="p-2.5  ">{job?.jobLocation}</td>
                      <td className="p-2.5  ">{job?.jobMode}</td>
                      <td className="p-2.5  ">{job?.jobType}</td>
                      <td className="p-2.5  ">{job?.jobSalary}</td>
                      <td className="p-2.5  ">
                        <span className="flex items-center gap-2">
                          {" "}
                          <Link href={`/recruiter/jobs/update/${job?._id}`}>
                            <Pencil
                              className="text-violet-500"
                              size={17}></Pencil>
                          </Link>
                          <Trash
                            onClick={() => JobDeleteAction(job?._id)}
                            className="text-red-500"
                            size={17}></Trash>{" "}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
      <FilterBar></FilterBar>
    </div>
  );
}
