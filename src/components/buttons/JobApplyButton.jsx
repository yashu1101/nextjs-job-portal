"use client";
import { useState } from "react";
import ResumeUploadPannel from "../ResumeUploadPannel";
import { CheckCircle } from "lucide-react";
import { WithdrawApplicationAction } from "@/actions/application.action";

export default function JopApplyButton({ jobTitle, jobId, jobApplications }) {
  const [isPannelShow, setIsPannelShow] = useState(false);

  // console.log(jobApplications[0].job);

  const existingApplication = jobApplications.find(
    (application) => application.job.toString() === jobId.toString(),
  );

  console.log("isAlredyApplied: ", existingApplication?.status);
  return (
    <>
      <div className="flex border-b border-outlined p-2.5 my-2.5 sm:text-[14px] text-[12px] text-white font-semibold  gap-2.5">
        {existingApplication?.status === "applied" ? (
          <>
            {/* SHOW APPLIED AND WITHDRAW BUTTON */}
            <button
              disabled
              onClick={() => setIsPannelShow(!isPannelShow)}
              className={`flex items-center gap-1.5 bg-orange-600 pointer-events-none cursor-not-allowed  rounded-[10px] p-2 px-4.5 transition-all ease duration-300`}>
              Applied <CheckCircle size={17}></CheckCircle>
            </button>

            <button
              onClick={() => WithdrawApplicationAction(existingApplication?._id)}
              className={`flex items-center gap-1.5 bg-red-500 hover:bg-red-600 rounded-[10px] p-2 px-4.5 transition-all ease duration-300`}>
              Withdraw Application
            </button>
          </>
        ) : existingApplication?.status === "shortlisted" ? (
          //  SHOW SHORTLISTED AND WITHDRAW BUTTON
          <>
            <button
              disabled
              className={`flex items-center gap-1.5 bg-blue-500 pointer-events-none cursor-not-allowed rounded-[10px] p-2 px-4.5 transition-all ease duration-300`}>
              Shortlisted <CheckCircle size={17}></CheckCircle>
            </button>

            <button
              onClick={() => WithdrawApplicationAction(existingApplication?._id)}
              className={`flex items-center gap-1.5 bg-red-500 hover:bg-red-600 rounded-[10px] p-2 px-4.5 transition-all ease duration-300`}>
              Withdraw Application
            </button>
          </>
        ) : existingApplication?.status === "hired" ? (
          // SHOW HIRED BUTTON

          <button
            disabled
            className={`flex items-center gap-1.5 bg-green-700 pointer-events-none cursor-not-allowed   rounded-[10px] p-2 px-4.5 transition-all ease duration-300`}>
            Hired <CheckCircle size={17}></CheckCircle>
          </button>
        ) : (
          // SHOW APPLY BUTTON
          <button
            onClick={() => setIsPannelShow(!isPannelShow)}
            className={`flex items-center gap-1.5 bg-blue-600 border text-white  hover:bg-blue-700 hover:border-transparent
           rounded-[10px] p-2 px-4.5 transition-all ease duration-300`}>
            Apply
          </button>
        )}
      </div>

      {isPannelShow && (
        <ResumeUploadPannel
          isPannelShow={isPannelShow}
          setIsPannelShow={setIsPannelShow}
          jobTitle={jobTitle}
          jobId={jobId.toString()}></ResumeUploadPannel>
      )}
    </>
  );
}
