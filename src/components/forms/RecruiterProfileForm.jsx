'use client'
import { RecruiterProfileAction, UpdateProfileAction } from "@/actions/profile.action";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

export default function RecruiterProfileForm({ profile, mode = "create" }) {

  const router = useRouter();
    // console.log("profile", profile);
  const isUpdate = mode == "update";

  // USE ACTION STATE
  const [state, dispatchAction, isPending] = useActionState(
    async (previousState, formData) => {
      if (isUpdate) {
        return await UpdateProfileAction(previousState, formData);
      }
      return await RecruiterProfileAction(previousState, formData);
    },
    null,
  );

  useEffect(() => {
    if (state?.status) {
      router.push("/recruiter/profile");
    }
  }, [state?.status]);
  return (
    <div className="flex flex-col  w-full max-w-[500] bg-white px-5 ">
      <span className="sm:text-2xl text-2xl text-center font-semibold my-6">
        {isUpdate ? "Update profile" : "Create profile"}
      </span>
      <div className="max-h-[550px] overflow-scroll scrollbar-none">
        <form
          action={dispatchAction}
          className="flex flex-col items-center  gap-2.5 ">
          <div className="flex flex-col items-baseline w-full">
            <label
              className=" font-semibold  py-1.25 px-1.25 text-[12px] sm:text-[14px] "
              htmlFor="phone">
              Work Phone
            </label>
            <input
              className="w-full border border-zinc-300 py-2.5 px-2.5 rounded-[10px] text-[12px] sm:text-[14px]"
              type="text"
              name="phone"
              defaultValue={profile?.phone}
              id="phone"
              placeholder="enter phone number"
              required
            />
          </div>
          {/* <span>Company Details</span> */}
          <div className="flex flex-col items-baseline w-full">
            <label
              className=" font-semibold  py-1.25 px-1.25 text-[12px] sm:text-[14px] "
              htmlFor="companyName">
              Company Name
            </label>
            <input
              className="w-full border border-zinc-300 py-2.5 px-2.5 rounded-[10px] text-[12px] sm:text-[14px]"
              type="text"
              name="companyName"
                defaultValue={profile?.companyName}
              id="companyName"
              required
              placeholder="Ex. Google, Oracle."
            />
          </div>

          <div className="flex flex-col items-baseline w-full">
            <label
              className=" font-semibold  py-1.25 px-1.25 text-[12px] sm:text-[14px] "
              htmlFor="companyLogo">
              Company Logo
            </label>
            <input
              className="w-full border border-zinc-300 py-2.5 px-2.5 rounded-[10px] text-[12px] sm:text-[14px]"
              type="file"
              name="companyLogo"
              id="companyLogo"
            />
          </div>

          <div className="flex flex-col items-baseline w-full">
            <label
              className=" font-semibold  py-1.25 px-1.25 text-[12px] sm:text-[14px] "
              htmlFor="companyType">
              Company Type
            </label>
            <input
              className="w-full border border-zinc-300 py-2.5 px-2.5 rounded-[10px] text-[12px] sm:text-[14px]"
              type="text"
              name="companyType"
                defaultValue={profile?.companyType}
              id="companyType"
              placeholder="Ex. Tech, Finance, Education."
            />
          </div>

          <div className="flex flex-col items-baseline w-full">
            <label
              className=" font-semibold  py-1.25 px-1.25 text-[12px] sm:text-[14px] "
              htmlFor="companyLocation">
              Company Location
            </label>
            <input
              className="w-full border border-zinc-300 py-2.5 px-2.5 rounded-[10px] text-[12px] sm:text-[14px]"
              type="text"
              name="companyLocation"
                defaultValue={profile?.companyLocation}
              id="companyLocation"
              placeholder="Ex. Noida, California"
            />
          </div>
          <div className="flex flex-col items-baseline w-full">
            <label
              className=" font-semibold  py-1.25 px-1.25 text-[12px] sm:text-[14px] "
              htmlFor="companyRegistrationNumber">
              Company Registration No.
            </label>
            <input
              className="w-full border border-zinc-300 py-2.5 px-2.5 rounded-[10px] text-[12px] sm:text-[14px]"
              type="text"
              name="companyRegistrationNumber"
                defaultValue={profile?.companyRegistrationNumber}
              id="companyRegistrationNumber"
              placeholder="Ex. U72200DL2023PTC123456"
            />
          </div>

          <div className="flex flex-col items-baseline w-full">
            <label
              className=" font-semibold  py-1.25 px-1.25 text-[12px] sm:text-[14px] "
              htmlFor="companyDescription">
              Company Description
            </label>
            <input
              className="w-full border border-zinc-300 py-2.5 px-2.5 rounded-[10px] text-[12px] sm:text-[14px]"
              type="text"
              name="companyDescription"
                defaultValue={profile?.companyDescription}
              id="companyDescription"
              placeholder="Describe your company."
            />
          </div>

          <div className="flex flex-col items-baseline w-full mt-1.5 ">
            {isUpdate ? (
              <button
                className={` flex gap-2.5 items-center justify-center w-full ${isPending ? "bg-green-500 text-black pointer-events-none " : "bg-blue-600 text-white "} hover:bg-blue-700 py-2.5 px-2.5 rounded-[10px] transition-all duration-500`}
                type="submit">
                {isPending ? (
                  <>
                    {" "}
                    Updating profile{" "}
                    <Loader size={15} className="animate-spin"></Loader>
                  </>
                ) : (
                  "Update Profile"
                )}
              </button>
            ) : (
              <button
                className={` flex gap-2.5 items-center justify-center w-full ${isPending ? "bg-green-500 text-black pointer-events-none " : "bg-blue-600 text-white"} hover:bg-blue-700 py-2.5 px-2.5 rounded-[10px] transition-all duration-500`}
                type="submit">
                {isPending ? (
                  <>
                    {" "}
                    Creating profile{" "}
                    <Loader size={15} className="animate-spin"></Loader>
                  </>
                ) : (
                  "Create Profile"
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
