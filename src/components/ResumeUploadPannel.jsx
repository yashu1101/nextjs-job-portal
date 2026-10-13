"use client";
import { ApplyJobAction, GetResume } from "@/actions/application.action";
import { useActionState, useEffect, useState } from "react";
import CustomLoader from "./CustomLoader";
import { CircleCheckBig, FileUser } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ResumeUploadPannel({
  isPannelShow,
  setIsPannelShow,
  jobTitle,
  jobId,
}) {
  const router = useRouter();

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  // GET RESUME

  useEffect(() => {
    async function getResume() {
      const result = await GetResume();

      if (result.status) {
        setResume(result.resume);
      }

      setLoading(false);
    }

    getResume();
  }, []);

  // console.log(resume);

  // GET APPLICATION

  const initialState = {
    status: false,
    message: "",
  };

  const [state, dispatchAction, isPending] = useActionState(
    ApplyJobAction,
    initialState,
  );

  // REDIRECT TO MY APPLICATION

  useEffect(() => {
    if (state.status) {
      router.push("/candidate/application");
    }
  }, [router, state.status]);
  return (
    <div className=" w-full h-dvh flex flex-col justify-center items-center gap-2.5 sm:text-[14px] text-[12px] absolute top-0 left-0 backdrop-brightness-80 z-50 ">
      {loading ? (
        <CustomLoader></CustomLoader>
      ) : (
        <form
          action={dispatchAction}
          className="relative overflow-hidden flex flex-col w-full max-w-100 rounded-[10px] p-3.5 gap-2.5 border-[0.5px] border-outlined bg-white">
          {/* APPLICATION SUBMITTED MESSAGE */}
          <div
            className={`flex flex-col items-center justify-center absolute w-full h-full left-0 top-0 bg-green-500 normal-case p-2.5 ${state.status ? "opacity-100 z-10" : "opacity-0 -z-10"} transition-all duration-300 ease `}>
            <CircleCheckBig className="w-[3rem] h-[3rem]"></CircleCheckBig>
            <span className="text-[1.3rem] normal-case font-medium">
              {" "}
              Application submitted
            </span>

            <p className="w-full max-w-75 mt-2.5">
              The recruiter will review your application and contact you if
              you're shortlisted.
            </p>
          </div>

          <div className="flex flex-col text-[1rem] border-b-[0.5px] border-outlined py-2.5 ">
            <span className="text-gray-500">Job Title</span>
            <span>{jobTitle}</span>
          </div>
          <input type="hidden" name="jobId" value={jobId} />
          {resume ? (
            <div className="flex flex-col gap-1.5">
              <span className="text-gray-500">Your resume</span>
              <Link
                href={resume.resume.url}
                className="border rounded-[10px] w-fit p-2.5 flex gap-[5px] items-center">
                {" "}
                <FileUser size={17}></FileUser> {resume.resume.name}
              </Link>
            </div>
          ) : (
            <div className="flex flex-col w-full gap-2.5 ">
              <label htmlFor="resume" className="text-[14px]">
                Upload Resume
              </label>
              <input
                className="w-full p-2.5 rounded-[10px] border"
                type="file"
                name="resume"
                id="resume"
              />
            </div>
          )}

          <div className="flex sm:flex-row flex-col gap-2.5 py-[15px] font-medium ">
            <button
              className={`flex-1 p-2.5 rounded-[10px] ${isPending ? "bg-orange-400 text-black " : "bg-blue-600 text-white"} transition-all duration-300 ease-in-out`}
              type="submit"
              disabled={isPending}>
              {isPending ? "Applying..." : "Proceed to apply"}
            </button>
            <button
              onClick={() => setIsPannelShow(!isPannelShow)}
              className="flex-1 p-2.5 rounded-[10px] bg-red-600 text-white"
              disabled={isPending}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
