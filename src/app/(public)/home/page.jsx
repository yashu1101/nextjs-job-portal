"use client";
import Searchbar from "@/components/Searchbar";
import TopCompanyCard from "@/components/TopCompanyCard";
import { JobCategory } from "@/components/JobCategory";

export default function Home() {
 
 
  return (
    <>
      <div className="w-full sm:text-[14px] text-[12px] flex flex-col items-center px-2.5  bg-white">
        {/* SEARCHBAR */}
        <div className="w-full max-w-150 flex flex-col items-center gap-5 py-10   mt-5 mb-5">
          <span className="sm:text-4xl text-3xl mb-5 capitalize font-semibold ">
            Find your dream <span className="text-blue-600">job</span>
          </span>
          <Searchbar
            RedirectOnFocus
            placeholder={"search for jobs"}
            padding={"sm:p-3.5 p-2.5"}
            border={"border"}></Searchbar>
        </div>

        {/* JOBS CATEGORY */}

        <div className="w-full flex flex-col items-center gap-5 py-10  mb-5 mt-5">
           <span className="sm:text-3xl text-2xl mb-5 capitalize font-semibold text-center">
            Find Jobs by Category
          </span>
          <JobCategory></JobCategory>
        </div>

        {/* TOP COMPANY CARDS */}

        <div className="w-full flex flex-col gap-5  items-center justify-center py-10 mb-5 mt-5 ">
          <span className="sm:text-3xl text-2xl mb-5 capitalize font-semibold text-center ">
            Top companies
          </span>
          <TopCompanyCard></TopCompanyCard>
        </div>
      </div>

      {/* <Footer></Footer> */}
    </>
  );
}
