"use client";
import Link from "next/link";
import Searchbar from "../Searchbar";
import { Eye, Trash } from "lucide-react";
import { date } from "@/util/date-formator";

export default function RecruitersTable({ companies }) {

  
  return (
    <div className="flex flex-col gap-2.5 py-5">
      {companies?.length === 0 ? (
        <div className="flex items-center justify-center h-[300px]">
          <span className="text-[14px] sm:text-[16px] text-black">
            No Companies found.
          </span>
        </div>
      ) : (
        <>
          <div className="flex flex-col w-full p-2.5">
            <span className="sm:text-2xl text-[1.3rem]  font-bold ">
              Companies
            </span>
            <span className="sm:text-[14px] text-[12px]">
              20 Registered Companies
            </span>
          </div>
          <div className="overflow-x-auto bg-white">
            <table className="table-auto sm:text-[14px] text-[12px] w-full text-nowrap  border border-[#80808040] rounded-[10px] overflow-hidden   ">
              <thead className="bg-blue-100 p-2.5 rounded-[10px]">
                <tr>
                  <th className="text-left p-2.5  ">#Id</th>
                  <th className="text-left p-2.5  ">Company Name</th>
                  <th className="text-left p-2.5  ">Company Type</th>
                  <th className="text-left p-2.5  ">Company Location</th>
                  <th className="text-left p-2.5  ">Registered Date</th>
                  <th className="text-left p-2.5  ">Action</th>
                </tr>
              </thead>
              <tbody>
                {companies?.map((company, index) => {
                  return (
                    <tr
                      key={index}
                      className="border-b border-[#80808040] text-nowrap ">
                      <td className="p-2.5 text-blue-600  ">
                        <Link href={`/candidate/profile/${company?._id}`}>
                          {`${company?._id.slice(0, 4)}...${company?._id.slice(-4)}`}
                        </Link>
                      </td>
                      <td className="p-2.5 capitalize ">{company?.name}</td>
                      <td className="p-2.5   ">{company?.email}</td>
                      <td className="p-2.5  ">{date(company?.createdAt)}</td>
                      <td className="p-2.5  ">
                        <span className="flex items-center gap-2.5">
                          <Link
                            href={`#`}
                            className="text-white bg-red-500 hover:bg-red-600 rounded-[10px] p-2 py-1.5 font-semibold">
                            <span className="flex items-center gap-1">
                              <Trash size={15}></Trash>
                              <span> Delete</span>
                            </span>
                          </Link>
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
    </div>
  );
}
