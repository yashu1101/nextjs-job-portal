import Searchbar from "@/components/Searchbar";
import { Eye, Trash } from "lucide-react";
import Link from "next/link";

export default function AdminRecruiters() {
  const recruiters = [
    {
      id: "1",
      name: "Yash Choudhary",
      email: "yash888990@gmail.com",
      createdAt: "Aug 23, 2026",
    },
    {
      id: "2",
      name: "Nishant Choudhary",
      email: "nishant888990@gmail.com",
      createdAt: "Aug 23, 2026",
    },
    {
      id: "3",
      name: "Rishi Choudhary",
      email: "rishi888990@gmail.com",
      createdAt: "Aug 23, 2026",
    },
  ];
  return (
    <div className="flex flex-col gap-2.5 py-5">
      <div>
        <span>Total 20 recruiters</span>
      </div>
      <div className="flex items-center gap-2.5 sm:text-[14px] text-[12px] ">
        <div className="w-full max-w-75">
          <Searchbar placeholder='search recruiters' border={"border"} padding={"sm:p-2.5 p-2"}></Searchbar>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto sm:text-[14px] text-[12px] w-full text-nowrap  border border-[#80808040] rounded-[10px] overflow-hidden  ">
          <thead className="bg-violet-950 p-2.5 rounded-[10px]">
            <tr>
              <th className="text-left p-2.5  ">Id</th>
              <th className="text-left p-2.5  ">Name</th>
              <th className="text-left p-2.5  ">Email</th>
              <th className="text-left p-2.5  ">RegisteredAt</th>
              <th className="text-left p-2.5  ">Action</th>
            </tr>
          </thead>
          <tbody>
            {recruiters?.map((recruiter, index) => {
              return (
                <tr
                  key={index}
                  className="border-b border-[#80808040] text-nowrap ">
                  <td className="p-2.5  ">{recruiter?.id}</td>
                  <td className="p-2.5  ">{recruiter?.name}</td>
                  <td className="p-2.5  ">{recruiter?.email}</td>
                  <td className="p-2.5 ">{recruiter?.createdAt}</td>
                  <td className="p-2.5 ">
                    <span className="flex items-center gap-2">
                      <Link href="#">
                        <Eye size={17}></Eye>
                      </Link>

                      <Trash size={17}></Trash>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
