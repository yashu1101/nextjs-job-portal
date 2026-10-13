import Link from "next/link";
import Searchbar from "../Searchbar";
import { Eye } from "lucide-react";

export default function ApplicationsTable({ applications }) {
  return (
    <div className="flex flex-col gap-2.5 py-5">
      <div>{/* <span>Total 20 jobs</span> */}</div>
      <div className="flex items-center gap-2.5 sm:text-[14px] text-[12px] ">
        
      </div>
      {applications?.length === 0 ? (
        <div className="flex items-center justify-center h-[300px]">
          <span className="text-[14px] sm:text-[16px] text-black">
            No applications found.
          </span>
        </div>
      ) : (
        <>
          <div className="p-2.5">
            <span className=" text-left font-semibold ">Your Application</span>
          </div>
          <div className="overflow-x-auto bg-white">
            <table className="table-auto sm:text-[14px] text-[12px] w-full text-nowrap  border border-[#80808040] rounded-[10px] overflow-hidden capitalize  ">
              <thead className="bg-blue-100 p-2.5 rounded-[10px]">
                <tr>
                  <th className="text-left p-2.5  ">Job Id </th>
                  <th className="text-left p-2.5  ">Title</th>
                  <th className="text-left p-2.5  ">Total Applicants</th>
                  <th className="text-left p-2.5  ">Action</th>
                </tr>
              </thead>
              <tbody>
                {applications?.map((application, index) => {
                  return (
                    <tr
                      key={index}
                      className="border-b border-[#80808040] text-nowrap ">
                      <td className="p-2.5 text-blue-600  ">{`${application?.job?._id.slice(0, 4)}...${application?.job?._id.slice(-4)}`}</td>
                      <td className="p-2.5   ">{application?.job?.jobTitle}</td>
                      <td className="p-2.5  ">{"100"}</td>
                      <td className="p-2.5  ">
                        <Link
                          href={`/recruiter/application/applicants/${application?.job?._id}`}>
                          <span className="flex items-center justify-center w-25 gap-2 bg-blue-600 p-1 font-medium rounded-[10px] text-white hover:bg-blue-700 transition-all duration-300 ">
                            {" "}
                            <Eye size={17}></Eye>
                            View
                          </span>
                        </Link>
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
