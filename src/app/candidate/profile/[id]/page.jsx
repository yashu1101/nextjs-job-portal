import { auth } from "@/lib/auth";
import { Mail, Phone, SquarePen, UserPen } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import { CandidateProfile } from "@/models/candidate.profile.model";
import { User } from "@/models/user.model";
import connectDB from "@/lib/db";
import Link from "next/link";
import { CurrentUser, RoleChecker } from "@/lib/current-user";
import AccessDenied from "@/components/AccessDenied";

export default async function CandidateProfilePage({ params }) {
  const { id } = await params;

  // CONNECT DB
  await connectDB();

  // GET CURRENT USER
  const user = await CurrentUser();

  // REDIRECT TO LOGIN PAGE
  if (!user) {
    redirect("/auth/login");
  }

  // CHECK ROLE
  const recruiter = RoleChecker(user, "recruiter");
  if (!recruiter) {
    return <AccessDenied></AccessDenied>;
  }

  const profile = await CandidateProfile.findOne({ user: id }).populate(
    "user",
    "name email",
  );

  // IF PROFILE NOT FOUND
  if (!profile)
    return (
      <div className="w-full h-full flex items-center  justify-center">
        <h1>Profile not found</h1>
      </div>
    );

  return (
    <div className="w-full py-5">
      <div className="capitalize bg-white p-2.5 sm:text-[14px] text-[12px]">
        <div className="flex flex-col bg-gradient p-3.5 px-5 mb-5 rounded-[10px] gap-3.5 w-full max-w-125 relative ">
          <div className="flex sm:flex-row flex-col items-center gap-3.5">
            <div className="rounded-[100] sm:w-20 sm:h-20 w-12.5 h-12.5 relative  ">
              <Image
                src={profile?.profilePhoto.url}
                fill
                placeholder="blur"
                blurDataURL={profile?.profilePhoto.url}
                alt="avtar"
                className="rounded-[100]"
              />
            </div>
            <div className="sm:text-[1.5rem] font-medium text-[1.3rem]">
              <span>{profile?.user?.name}</span>
            </div>
          </div>
          {(session.user.role === "candidate" ||
            session.user.role === "recruiter") && (
            <div className="flex flex-col gap-1">
              <span className="flex items-center gap-2.5 text-black sm:text-[14px] text-[12px]">
                <Phone size={16}></Phone> {profile?.phone}
              </span>
              <span className="flex items-center gap-2.5 text-black sm:text-[14px] text-[12px] lowercase">
                <Mail size={16}></Mail> {profile?.user?.email}
              </span>
            </div>
          )}
        </div>

        <div>
          <div className="flex flex-col border-b border-outlined p-2.5  ">
            <span className="text-black font-semibold ">Headline</span>
            <span>{profile?.professionalTitle}</span>
          </div>

          <div className="flex flex-col border-b border-outlined p-2.5  gap-3.5 ">
            <span className="text-black font-bold ">Qualification</span>
            <div className="flex flex-col">
              <span className="text-black font-semibold ">Degree/Diploma</span>
              <span>{profile?.qualification}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-black font-semibold ">Field/Stream</span>
              <span>{profile?.studyField}</span>
            </div>
          </div>

          <div className="flex flex-col border-b border-outlined p-2.5 gap-3.5 ">
            <span className="text-black font-semibold  ">Skills</span>
            <div className="flex gap-2.5 flex-wrap">
              {profile?.skill?.map((skill, index) => {
                return (
                  <span
                    key={index}
                    className="border border-zinc-300 rounded-full px-2.5 bg-blue-100 ">
                    {skill?.trim()}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col border-b border-outlined p-2.5  gap-3.5 ">
            <span className="text-black font-bold ">Location</span>
            <div className="flex flex-col">
              <span className="text-black font-semibold ">Country</span>
              <span>{profile?.country}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-black font-semibold ">State</span>
              <span>{profile?.state}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-black font-semibold ">City</span>
              <span>{profile?.city}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
