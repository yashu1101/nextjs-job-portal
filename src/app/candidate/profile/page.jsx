import { Mail, Phone, SquarePen } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { CandidateProfile } from "@/models/candidate.profile.model";
import { User } from "@/models/user.model";
import connectDB from "@/lib/db";
import Link from "next/link";
import AccessDenied from "@/components/AccessDenied";
import { CurrentUser, RoleChecker } from "@/lib/current-user";

export default async function CandidateProfilePage() {
  // CONNECT DB
  await connectDB();

  // GET CURRENT USER

  const user = await CurrentUser();
  if (!user) {
    redirect("/auth/login");
  }

  // CHECK ROLE

  const candidate = RoleChecker(user, "candidate");
  if (!candidate) {
    return <AccessDenied></AccessDenied>;
  }

  // CHECK IF ALREADY EXIST
  const profile = await CandidateProfile.findOne({ user: user?.id }).populate(
    "user",
    "name email",
  );

  // REDIRECT TO CREATE PROFILE PAGE
  if (!profile) redirect("/candidate/profile/create");

  return (
    <div className="w-full py-5">
      <div className="capitalize text-[12px] sm:text-[14px] bg-white p-2.5">
        <div className="flex flex-col bg-gradient p-3.5 px-5 mb-5 rounded-[10px] gap-3.5 w-full max-w-125 relative ">
          {/* edit profile button */}

          {candidate && (
            <Link
              href="/candidate/profile/update"
              className="absolute top-3.5 right-2.5">
              <SquarePen size={20} className="text-black"></SquarePen>
            </Link>
          )}

          <div className="flex sm:flex-row flex-col items-center gap-3.5">
            <div className="rounded-[100] sm:w-20 sm:h-20 w-12.5 h-12.5 relative  ">
              <Image
                src={profile?.profilePhoto?.url}
                fill
              
                alt="avtar"
                className="rounded-[100]"
              />
            </div>
            <div className="sm:text-2xl text-[1.3rem] font-bold">
              <span>{profile?.user?.name}</span>
            </div>
          </div>
          {(user?.role === "candidate" || user?.role === "recruiter") && (
            <div className="flex flex-col gap-1">
              <span className="flex items-center gap-2.5 text-black  sm:text-[14px] text-[12px]">
                <Phone size={16}></Phone> {profile?.phone}
              </span>
              <span className="flex items-center gap-2.5 text-black  sm:text-[14px] text-[12px] lowercase">
                <Mail size={16}></Mail> {profile?.user?.email}
              </span>
            </div>
          )}
        </div>

        <div>
          <div className="flex flex-col border-b border-outlined p-2.5  ">
            <span className="text-black  font-bold ">Headline</span>
            <span>{profile?.professionalTitle}</span>
          </div>

          <div className="flex flex-col border-b border-outlined p-2.5  gap-3.5 ">
            <span className="text-black font-bold ">Qualification</span>
            <div className="flex flex-col">
              <span className="text-black font-medium ">Degree/Diploma</span>
              <span>{profile?.qualification}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-black  font-bold ">Field/Stream</span>
              <span>{profile?.studyField}</span>
            </div>
          </div>

          <div className="flex flex-col border-b border-outlined p-2.5  gap-3.5 ">
            <span className="text-black font-bold ">Skills</span>
            <div className="flex gap-2.5 flex-wrap">
              {profile?.skill?.map((skill, index) => {
                return (
                  <span
                    key={index}
                    className="border border-zinc-300 bg-blue-100 rounded-full px-2.5">
                    {skill?.trim()}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col border-b border-outlined p-2.5  gap-3.5 ">
            <span className="text-black font-bold ">Location</span>
            <div className="flex flex-col">
              <span className="text-black font-bold ">Country</span>
              <span>{profile?.country}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-black font-bold ">State</span>
              <span>{profile?.state}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-black font-bold ">City</span>
              <span>{profile?.city}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
