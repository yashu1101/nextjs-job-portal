"use client";
import Link from "next/link";
import Searchbar from "../Searchbar";
import { date } from "@/util/date-formator";
import { Eye } from "lucide-react";
import { UpdateApplicationStatusAction } from "@/actions/application.action";
import { useState } from "react";

export default function ApplicantsTable({ applicants, totalApplicants }) {
  const [status, setStatus] = useState("");

  console.log(applicants);

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
  };

  const handleUpdate = async (applicationId, status) => {
    UpdateApplicationStatusAction(applicationId, status);
  };

  return (
    <div className="flex flex-col gap-2.5 py-5">
      <div className="flex items-center gap-2.5 sm:text-[14px] text-[12px] ">
        <div className="w-full max-w-75">
          <Searchbar
            placeholder={"search applicants"}
            border={"border"}
            padding={"sm:p-2.5 p-2"}></Searchbar>
        </div>
      </div>

      {applicants?.length === 0 ? (
        <div className="flex items-center justify-center h-[300px]">
          <span className="text-[14px] sm:text-[16px] text-gray-500">
            No applicants for this job.
          </span>
        </div>
      ) : (
        <>
          <div className="p-2.5">
            {" "}
            <span className=" text-left font-semibold ">
              Total {totalApplicants} Applicants{" "}
            </span>
          </div>
          <div className="overflow-x-auto bg-white">
            <table className="table-auto sm:text-[14px] text-[12px] w-full text-nowrap  border border-[#80808040] rounded-[10px] overflow-hidden capitalize  ">
              <thead className="bg-blue-100 p-2.5 rounded-[10px]">
                <tr>
                  <th className="text-left p-2.5  ">Id</th>
                  <th className="text-left p-2.5  ">Name</th>
                  <th className="text-left p-2.5  ">Applied Date</th>
                  <th className="text-left p-2.5  ">Status</th>
                  <th className="text-left p-2.5  ">Action</th>
                </tr>
              </thead>
              <tbody>
                {applicants?.map((applicant, index) => {
                  return (
                    <tr
                      key={index}
                      className="border-b border-[#80808040] text-nowrap ">
                      <td className="p-2.5 text-blue-600  ">
                        <Link
                          href={`/candidate/profile/${applicant?.user?._id}`}>
                          {`${applicant?._id.slice(0, 4)}...${applicant?._id.slice(-4)}`}
                        </Link>
                      </td>
                      <td className="p-2.5   ">{applicant?.user?.name}</td>
                      <td className="p-2.5  ">{date(applicant?.createdAt)}</td>
                      <td
                        className={`p-2.5 font-semibold capitalize ${applicant?.status === "applied" ? "text-orange-600" : applicant?.status === "shortlisted" ? "text-blue-600" : applicant?.status === "rejected" ? "text-red-500" : applicant?.status === "hired" ? "text-green-700" : applicant?.status === "withdrawn" ? "text-red-500" : ""} `}>
                        {applicant?.status}
                      </td>
                      <td className="p-2.5  ">
                        <div className="flex items-center gap-2.5">
                          <span>
                            <select
                              name="status"
                              disabled={
                                applicant?.status === "hired" ||
                                  applicant?.status === "rejected" ||
                                  applicant?.status === "withdrawn"
                              }
                              id=""
                              value={status}
                              onChange={(e) =>
                                handleStatusChange(e, applicant._id)
                              }
                              className="bg-white border border-gray-300 rounded-[5px] p-1 text-[12px] sm:text-[14px] capitalize">
                              {applicant?.status === "applied" ? (
                                <>
                                  <option value="shortlisted">
                                    Shortlisted
                                  </option>
                                  <option value="rejected">Rejected</option>
                                  <option value="hired">Hired</option>
                                </>
                              ) : applicant?.status === "shortlisted" ? (
                                <>
                                  <option value="rejected">Rejected</option>
                                  <option value="hired">Hired</option>
                                </>
                              ) : applicant?.status === "rejected" ? (
                                <option value="rejected">Rejected</option>
                              ) : applicant?.status === "hired" ? (
                                <option value="hired">Hired</option>
                              ) : applicant?.status === "withdrawn" ? (
                                <option value="withdrawn">Withdrawn</option>
                              ) : (
                                ""
                              )}
                            </select>
                          </span>

                          {status && (
                            <button
                              className="flex items-center justify-center w-20 gap-2 bg-blue-600 p-1 font-medium rounded-[10px] text-white hover:bg-blue-700 transition-all duration-300 "
                              onClick={() =>
                                handleUpdate(applicant._id, status)
                              }>
                              Update
                            </button>
                          )}
                        </div>
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
