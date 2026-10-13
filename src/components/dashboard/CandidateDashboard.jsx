"use client";
export default function CandidateDashboard({ dashboardData }) {
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
        <div className="flex w-full gap-2.5">
          <div className="flex-1 flex flex-col text-white bg-violet-700 p-3.5 rounded-[10px]">
            <span className="font-medium">Total Applications</span>
            <span className="text-[3rem] font-extrabold">
              {dashboardData.totalApplications}
            </span>
          </div>
          <div className="flex-1 flex flex-col text-white bg-purple-700 p-3.5 rounded-[10px]">
            <span className="font-medium">Saved Jobs</span>
            <span className="text-[3rem] font-extrabold">
              {dashboardData.totalSavedJobs}
            </span>
          </div>
        </div>
      </div>

      {/* APPLICATION STATS */}
      <div className="flex flex-col gap-5">
        <div>
          <span className="text-lg font-bold text-black">
            Application Stats
          </span>
        </div>

        <div className="flex w-full gap-2.5 flex-wrap">
          <div className="w-full md:flex-1 md:min-w-[200px] flex flex-col text-white bg-orange-500 p-3.5 rounded-[10px]">
            <span className="font-medium">Applied</span>
            <span className="text-[3rem] font-extrabold">
              {dashboardData.totalApplied}
            </span>
          </div>

          <div className="w-full md:flex-1 md:min-w-[200px] flex flex-col text-white bg-blue-500 p-3.5 rounded-[10px]">
            <span className="font-medium">Shortlisted</span>
            <span className="text-[3rem] font-extrabold">
              {dashboardData.totalShortlisted}
            </span>
          </div>

          <div className="w-full md:flex-1 md:min-w-[200px] flex flex-col text-white bg-red-500 p-3.5 rounded-[10px]">
            <span className="font-medium">Rejected</span>
            <span className="text-[3rem] font-extrabold">
              {dashboardData.totalRejected}
            </span>
          </div>

          <div className="w-full md:flex-1 md:min-w-[200px] flex flex-col text-white bg-green-600 p-3.5 rounded-[10px]">
            <span className="font-medium">Hired</span>
            <span className="text-[3rem] font-extrabold">
              {dashboardData.totalHired}
            </span>
          </div>

          <div className="w-full md:flex-1 md:min-w-[200px] flex flex-col text-white bg-gray-500 p-3.5 rounded-[10px]">
            <span className="font-medium">Withdrawn</span>
            <span className="text-[3rem] font-extrabold">
              {dashboardData.totalWithdrawn}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
