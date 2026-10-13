import Searchbar from "@/components/Searchbar";
import { amazonLogo, flipkartLogo, googleLogo } from "@/util/image-provider";
import { Eye, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AdminCompanies() {
  const companies = [
    {
      id: "1",
      name: "google",

      location: "california",
      type: "tech",
      registerationNumber: "G123",
      createdAt: "Aug 23, 2026",
    },

    {
      id: "2",
      name: "amazone",

      location: "california",
      type: "tech",
      registerationNumber: "A123",
      createdAt: "Aug 23, 2026",
    },

    {
      id: "3",
      name: "flipkart",

      location: "benguluru",
      type: "sales",
      registerationNumber: "F123",
      createdAt: "Aug 23, 2026",
    },
  ];
  return (
    <div className="flex flex-col gap-2.5 py-5">
      <div>
        <span>Total 20 companies</span>
      </div>
      <div className="flex items-center gap-2.5 sm:text-[14px] text-[12px] ">
        <div className="w-full max-w-75">
          <Searchbar
            placeholder={"search companies"}
            border={"border"}
            padding={"sm:p-2.5 p-2"}></Searchbar>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto sm:text-[14px] text-[12px] w-full text-nowrap  border border-[#80808040] rounded-[10px] overflow-hidden  ">
          <thead className="bg-violet-950 p-2.5 rounded-[10px]">
            <tr>
              <th className="text-left p-2.5  ">Id</th>
              <th className="text-left p-2.5  ">Name</th>
              <th className="text-left p-2.5  ">Type</th>
              <th className="text-left p-2.5  ">Location</th>
              <th className="text-left p-2.5  ">Reg No.</th>
              <th className="text-left p-2.5  ">Action</th>
            </tr>
          </thead>
          <tbody>
            {companies?.map((company, index) => {
              return (
                <tr
                  key={index}
                  className="border-b border-[#80808040] text-nowrap ">
                  <td className="p-2.5  ">{company?.id}</td>
                  <td className="p-2.5  ">{company?.name.toUpperCase()}</td>
                  <td className="p-2.5  ">{company?.type.toUpperCase()}</td>
                  <td className="p-2.5  ">{company?.location.toUpperCase()}</td>
                  <td className="p-2.5  ">{company?.registerationNumber}</td>
                  {/* <td className="p-2.5 ">{company?.createdAt}</td> */}
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
