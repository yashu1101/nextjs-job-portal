"use client";
export default function AdminDashboard({ dashboardData }) {
  return (
    <div className="w-full sm:px-5 px-2.5 py-3 flex flex-col gap-5 bg-white">
      <div className="text-2xl font-extrabold text-black">
        <span>Dashboard</span>
      </div>
      {/* OVERVIEW */}
      <div className="flex flex-col gap-5">
        <div>
          <span className="text-lg font-bold text-black">Overview</span>
        </div>
        <div className="flex flex-col w-full gap-2.5">
          <div className="flex-1 flex flex-col text-white bg-violet-700 p-3.5 rounded-[10px]">
            <span className="font-medium">Total Candidates</span>
            <span className="text-[3rem] font-extrabold">
              {dashboardData?.totalCandidates}
            </span>
          </div>
          <div className="flex-1 flex flex-col text-white bg-purple-700 p-3.5 rounded-[10px]">
            <span className="font-medium">Total Companies</span>
            <span className="text-[3rem] font-extrabold">
              {dashboardData?.totalCompanies}
            </span>
          </div>
          <div className="flex-1 flex flex-col text-white bg-blue-700 p-3.5 rounded-[10px]">
            <span className="font-medium">Total Jobs</span>
            <span className="text-[3rem] font-extrabold">
              {dashboardData?.totalJobs}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
