"use client";

import {
  CandidateProfileAction,
  UpdateProfileAction,
} from "@/actions/profile.action";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

export default function CandidateProfileForm({ profile, mode = "create" }) {
  const router = useRouter();

  const isUpdate = mode == "update";

  // USE ACTION STATE
  const [state, dispatchAction, isPending] = useActionState(
    async (previousState, formData) => {
      if (isUpdate) {
        return await UpdateProfileAction(previousState, formData);
      }

      return await CandidateProfileAction(previousState, formData);
    },
    null,
  );

  // REDIRECT TO PROFILE PAGE AFTER CREATING OR UPDATING PROFILE
  useEffect(() => {
    if (state?.status) {
      router.push("/candidate/profile");
    }
  }, [state?.status]);

  return (
    <div className="flex flex-col  w-full max-w-[500] px-5 bg-white pb-15">
      <span className="sm:text-2xl text-2xl text-center my-6">
        {isUpdate ? "Update Profile" : "Create Profile"}
      </span>
      <div className="max-h-[550px] overflow-scroll scrollbar-none">
        <form
          action={dispatchAction}
          className="flex flex-col items-center - gap-2.5 ">
          <div className="flex flex-col items-baseline w-full">
            <label
              className="py-1.25 px-1.25 text-[12px] sm:text-[14px] "
              htmlFor="profilePhoto">
              Profile Photo
            </label>
            <input
              className="w-full border border-zinc-300 py-2.5 px-2.5 rounded-[10px] text-[12px] sm:text-[14px]"
              type="file"
              name="profilePhoto"
              id="profilePhoto"
              // placeholder="enter your fullname"
            />
          </div>
          <div className="flex flex-col items-baseline w-full">
            <label
              className="py-1.25 px-1.25 text-[12px] sm:text-[14px] "
              htmlFor="phone">
              Phone
            </label>
            <input
              className="w-full border border-zinc-300 py-2.5 px-2.5 rounded-[10px] text-[12px] sm:text-[14px]"
              type="text"
              name="phone"
              id="phone"
              defaultValue={profile?.phone}
              placeholder="enter phone number"
              required
            />
          </div>

          <div className="flex flex-col items-baseline w-full">
            <label
              className="py-1.25 px-1.25 text-[12px] sm:text-[14px] "
              htmlFor="qualification">
              Qualification
            </label>

            <select
              className="w-full border bg-white text-black border-zinc-300 py-2.5 px-2.5 rounded-[10px] text-[12px] sm:text-[14px]"
              name="qualification"
              defaultValue={profile?.qualification}>
              <option className=" text-gray-400 text-black" value="">
                Select Qualification
              </option>
              <option className=" text-black" value="btech">
                B.Tech
              </option>
              <option className=" text-black" value="bsc">
                B.Sc
              </option>
              <option className=" text-black" value="mca">
                MCA
              </option>
              <option className=" text-black" value="12th">
                12TH
              </option>
              <option className=" text-black" value="10th">
                10TH
              </option>
              <option className=" text-black" value="other">
                Other
              </option>
            </select>
          </div>

          <div className="flex flex-col items-baseline w-full">
            <label
              className="py-1.25 px-1.25 text-[12px] sm:text-[14px] "
              htmlFor="studyField">
              Field / Stream
            </label>
            <input
              className="w-full border border-zinc-300 py-2.5 px-2.5 rounded-[10px] text-[12px] sm:text-[14px]"
              type="text"
              name="studyField"
              id="studyField"
              defaultValue={profile?.studyField}
              required
              placeholder="Ex. Computer Science, Mechanical , Arts."
            />
          </div>
          <div className="flex flex-col items-baseline w-full">
            <label
              className="py-1.25 px-1.25 text-[12px] sm:text-[14px] "
              htmlFor="professionalTitle">
              Professional Title
            </label>
            <input
              className="w-full border border-zinc-300 py-2.5 px-2.5 rounded-[10px] text-[12px] sm:text-[14px]"
              type="text"
              name="professionalTitle"
              id="professionalTitle"
              defaultValue={profile?.professionalTitle}
              placeholder="Ex. Frontend Developer , App Developer"
              required
            />
          </div>

          <div className="flex flex-col items-baseline w-full">
            <label
              className="py-1.25 px-1.25 text-[12px] sm:text-[14px] "
              htmlFor="skill">
              Skills
            </label>
            <input
              className="w-full border border-zinc-300 py-2.5 px-2.5 rounded-[10px] text-[12px] sm:text-[14px]"
              type="text"
              name="skill"
              id="skill"
              defaultValue={profile?.skill}
              placeholder="Ex. JavaScript, Excell, Graphic design, Communication. "
              required
            />
          </div>
          <div className="flex flex-col items-baseline w-full">
            <label
              className="py-1.25 px-1.25 text-[12px] sm:text-[14px] "
              htmlFor="city">
              City
            </label>
            <input
              className="w-full border border-zinc-300 py-2.5 px-2.5 rounded-[10px] text-[12px] sm:text-[14px]"
              type="text"
              name="city"
              defaultValue={profile?.city}
              id="city"
              required
            />
          </div>

          <div className="flex flex-col items-baseline w-full">
            <label
              className="py-1.25 px-1.25 text-[12px] sm:text-[14px] "
              htmlFor="state">
              State
            </label>
            <input
              className="w-full border border-zinc-300 py-2.5 px-2.5 rounded-[10px] text-[12px] sm:text-[14px]"
              type="text"
              name="state"
              defaultValue={profile?.state}
              id="state"
              required
            />
          </div>
          <div className="flex flex-col items-baseline w-full">
            <label
              className="py-1.25 px-1.25 text-[12px] sm:text-[14px] "
              htmlFor="country">
              Country
            </label>
            <input
              className="w-full border border-zinc-300 py-2.5 px-2.5 rounded-[10px] text-[12px] sm:text-[14px]"
              type="text"
              name="country"
              defaultValue={profile?.country}
              id="country"
              required
            />
          </div>

          <div className="flex flex-col items-baseline w-full mt-1.5 mb-5 ">
            {isUpdate ? (
              <button
                className={`w-full text-white font-semibold ${isPending ? "bg-green-500 pointer-events-none " : "bg-blue-600"}  py-2.5 px-2.5 rounded-[10px] transition-all duration-500`}
                type="submit">
                {isPending ? "Updating profile" : "Update Profile"}
              </button>
            ) : (
              <button
                className={`w-full text-white font-semibold ${isPending ? "bg-green-500 pointer-events-none " : "bg-blue-600"}  py-2.5 px-2.5 rounded-[10px] transition-all duration-500`}
                type="submit">
                {isPending ? "Creating profile" : "Create Profile"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
