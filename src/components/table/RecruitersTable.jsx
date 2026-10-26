"use client";
import Link from "next/link";
import Searchbar from "../Searchbar";
import { Eye, Trash } from "lucide-react";
import { date } from "@/util/date-formator";
import AdminDeleteUserButton from "../buttons/AdminDeleteUserButton";

export default function RecruitersTable({ companies }) {
  console.log(companies);

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
                        <Link href={`/recruiter/profile/${company?.user?._id}`}>
                          {`${company?._id.slice(0, 4)}...${company?.user?._id.slice(-4)}`}
                        </Link>
                      </td>
                      <td className="p-2.5 capitalize ">
                        {company?.companyName}
                      </td>
                      <td className="p-2.5 capitalize  ">
                        {company?.companyType}
                      </td>
                      <td className="p-2.5 capitalize  ">
                        {company?.companyLocation}
                      </td>
                      <td className="p-2.5 capitalize ">
                        {date(company?.user?.createdAt)}
                      </td>
                      <td className="p-2.5 capitalize ">
                        <span className="flex items-center gap-2.5">
                         <AdminDeleteUserButton userId={company?.user?._id}></AdminDeleteUserButton>
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
