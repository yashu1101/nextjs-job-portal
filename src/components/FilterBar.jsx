"use client";

import { useContext } from "react";
import { ToggleFilterbarContext } from "@/context/ToggleFilterbarContext";
import { X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function FilterBar() {
  const { isFilterbarOpen, setIsFilterbarOpen } = useContext(
    ToggleFilterbarContext,
  );

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Job Mode
  const jobModes = [
    {
      title: "Any",
      value: "any",
    },
    {
      title: "Remote",
      value: "remote",
    },
    {
      title: "On-Site",
      value: "on-site",
    },
    {
      title: "Hybrid",
      value: "hybrid",
    },
  ];

  // Job Type
  const jobTypes = [
    {
      title: "Any",
      value: "any",
    },
    {
      title: "Full-Time",
      value: "full-time",
    },
    {
      title: "Part-Time",
      value: "part-time",
    },
    {
      title: "Internship",
      value: "internship",
    },
  ];

  // Job Category
  const jobCategories = [
    {
      title: "Any",
      value: "any",
    },
    {
      title: "Web Development",
      value: "web-developemnt",
    },
    {
      title: "App Development",
      value: "app-development",
    },
    {
      title: "Designer",
      value: "designer",
    },
    {
      title: "Software Engineer",
      value: "software-engineer",
    },
    {
      title: "Ai Engineer",
      value: "ai-engineer",
    },
    {
      title: "DevOps and Cloud",
      value: "devops-and-cloud",
    },
    {
      title: "Cyber Security",
      value: "cyber-security",
    },
  ];
  // Job Category
  const jobSalaries = [
    {
      title: "Any",
      value: "any",
    },
    {
      title: "3 LPA+",
      value: 3,
    },
    {
      title: "5 LPA+",
      value: 5,
    },
    {
      title: "8 LPA+",
      value: 8,
    },
    {
      title: "10 LPA+",
      value: 10,
    },
    {
      title: "15 LPA+",
      value: 15,
    },
    {
      title: "20 LPA+",
      value: 20,
    },
  ];

  // job Loacations

  const jobLocations = [
    {
      title: "Any",
      value: "any",
    },
    {
      title: "Mumbai",
      value: "mumbai",
    },
    {
      title: "Chennai",
      value: "chennai",
    },
    {
      title: "Ahmedabad",
      value: "ahmedabad",
    },

    {
      title: "Pune",
      value: "pune",
    },
    {
      title: "Hyderabad",
      value: "hyderabad",
    },
  ];

  // Handle filter change
  const handleFilterChange = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "any") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    const query = params.toString();

    router.push(query ? `${pathname}?${query}` : pathname);
  };

  // Clear all filters
  const handleClearAll = () => {
    router.push(pathname);
  };

  return (
    <div
      className={`sm:text-[14px] text-[12px]  flex-col bg-white w-full max-w-75 min-h-screen  p-2.5 border-l border-outlined fixed right-0  transition-all ease-in duration-200 ${
        isFilterbarOpen ? "translate-x-0 " : "translate-x-[100%] "
      }`}>
      {/* Close Button */}
      <div
        onClick={() => setIsFilterbarOpen(false)}
        className="bg-white p-1.5 rounded-[10px] lg:hidden inline-block w-fit">
        <X />
      </div>

      <span className="text-[16px] ml-1 mt-2.5 mb-2.5 text-black">Filter</span>

      <div className="flex flex-col">
        {/* Job Mode */}
        <div className="flex flex-col gap-1 border-b border-outlined py-2.5">
          <span className="text-[12px] text-black font-medium pl-1  ">Job Mode</span>
          <select
            className="focus:outline-0"
            value={searchParams.get("jobMode") || "any"}
            onChange={(e) => handleFilterChange("jobMode", e.target.value)}>
            {jobModes.map((mode, index) => (
              <option key={index} className="bg-white" value={mode.value}>
                {mode.title}
              </option>
            ))}
          </select>
        </div>

        {/* Job Type */}
        <div className="flex flex-col gap-1 border-b border-outlined py-2.5">
          <span className="text-[12px] text-black font-medium pl-1  ">Job Type</span>
          <select
            className="focus:outline-0"
            value={searchParams.get("jobType") || "any"}
            onChange={(e) => handleFilterChange("jobType", e.target.value)}>
            {jobTypes.map((type, index) => (
              <option key={index} className="bg-white" value={type.value}>
                {type.title}
              </option>
            ))}
          </select>
        </div>

        {/* Job Category */}
        <div className="flex flex-col gap-1 border-b border-outlined py-2.5">
          <span className="text-[12px] text-black font-medium pl-1  ">
            Job Category
          </span>
          <select
            className="focus:outline-0"
            value={searchParams.get("jobCategory") || "any"}
            onChange={(e) => handleFilterChange("jobCategory", e.target.value)}>
            {jobCategories.map((category, index) => (
              <option key={index} className="bg-white" value={category.value}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
        {/* Job salary */}
        <div className="flex flex-col gap-1 border-b border-outlined py-2.5">
          <span className="text-[12px] text-black font-medium  pl-1 ">
            Job Salary
          </span>
          <select
            className="focus:outline-0"
            value={searchParams.get("jobSalary") || "any"}
            onChange={(e) => handleFilterChange("jobSalary", e.target.value)}>
            {jobSalaries.map((salary, index) => (
              <option key={index} className="bg-white" value={salary.value}>
                {salary.title}
              </option>
            ))}
          </select>
        </div>

        {/* Job Location */}
        <div className="flex flex-col gap-1 border-b border-outlined py-2.5">
          <span className="text-[12px] text-black font-medium pl-1 ">
            Job Location
          </span>
          <select
            className="focus:outline-0"
            value={searchParams.get("jobLocation") || "any"}
            onChange={(e) => handleFilterChange("jobLocation", e.target.value)}>
            {jobLocations.map((location, index) => (
              <option key={index} className="bg-white" value={location.value}>
                {location.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Clear All */}
      <div>
        <button
          onClick={handleClearAll}
          className="text-[12px] sm:text-[14px] border p-1.5 px-3.5 rounded-[10px] mt-3.5 hover:bg-blue-600 hover:border-transparent hover:text-white transition-all ease duration-300">
          Clear All
        </button>
      </div>
    </div>
  );
}
