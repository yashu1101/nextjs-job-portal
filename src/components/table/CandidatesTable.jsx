"use client";
import Link from "next/link";
import Searchbar from "../Searchbar";
import { Eye, Trash } from "lucide-react";
import { date } from "@/util/date-formator";
import AdminDeleteUserButton from "@/components/buttons/AdminDeleteUserButton";

export default function CandidatesTable({ candidates }) {
  return (
    <div className="flex flex-col gap-2.5 py-5">
      {candidates?.length === 0 ? (
        <div className="flex items-center justify-center h-[300px]">
          <span className="text-[14px] sm:text-[16px] text-black">
            No Candidates found.
          </span>
        </div>
      ) : (
        <>
          <div className="flex flex-col w-full p-2.5">
            <span className="sm:text-2xl text-[1.3rem]  font-bold ">
              Candidates
            </span>
            <span className="sm:text-[14px] text-[12px]">
              20 Registered Candidates
            </span>
          </div>
          <div className="overflow-x-auto bg-white">
            <table className="table-auto sm:text-[14px] text-[12px] w-full text-nowrap  border border-[#80808040] rounded-[10px] overflow-hidden   ">
              <thead className="bg-blue-100 p-2.5 rounded-[10px]">
                <tr>
                  <th className="text-left p-2.5  ">#Id</th>
                  <th className="text-left p-2.5  ">Name</th>
                  <th className="text-left p-2.5  ">Email</th>
                  <th className="text-left p-2.5  ">Registered Date</th>
                  <th className="text-left p-2.5  ">Action</th>
                </tr>
              </thead>
              <tbody>
                {candidates?.map((candidate, index) => {
                  return (
                    <tr
                      key={index}
                      className="border-b border-[#80808040] text-nowrap ">
                      <td className="p-2.5 text-blue-600  ">
                        <Link href={`/candidate/profile/${candidate?._id}`}>
                          {`${candidate?._id.slice(0, 4)}...${candidate?._id.slice(-4)}`}
                        </Link>
                      </td>
                      <td className="p-2.5 capitalize ">{candidate?.name}</td>
                      <td className="p-2.5   ">{candidate?.email}</td>
                      <td className="p-2.5  ">{date(candidate?.createdAt)}</td>
                      <td className="p-2.5  ">
                        <AdminDeleteUserButton userId={candidate?._id} ></AdminDeleteUserButton>
                        {/* <span className="flex items-center gap-2.5">
                          <Link
                            href={`#`}
                            className="text-white bg-red-500 hover:bg-red-600 rounded-[10px] p-2 py-1.5 font-semibold">
                            <span className="flex items-center gap-1">
                              <Trash size={15}></Trash>
                              <span> Delete</span>
                            </span>
                          </Link>
                        </span> */}
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
