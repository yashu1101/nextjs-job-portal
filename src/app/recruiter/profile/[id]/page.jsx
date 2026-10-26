import { auth } from "@/lib/auth";
import { Mail, Phone, SquarePen } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import connectDB from "@/lib/db";
import { RecruiterProfile } from "@/models/recruiter.profile.model";
import Link from "next/link";
import { CurrentUser, RoleChecker } from "@/lib/current-user";
import AccessDenied from "@/components/AccessDenied";
import DeleteUserButton from "@/components/buttons/DeleteUserButton";
import { dummyAvatar } from "@/util/image-provider";

export default async function RecruiterProfilePage({ params }) {
  const { id } = await params;
  // CONNECT DB
  await connectDB();

  // GET CURRENT USER

  const user = await CurrentUser();
  if (!user) {
    redirect("/auth/login");
  }

  // CHECK ROLE

  const admin = RoleChecker(user, "admin");
  if (!admin) {
    return <AccessDenied></AccessDenied>;
  }

  // CHECK IF ALREADY EXIST
  const profile = await RecruiterProfile.findOne({ user: id });
  if(!profile){
    return notFound()
  }

  return (
    <div className="w-full py-5">
      <div className="capitalize text-[12px] sm:text-[14px] bg-white p-2.5 pb-15 ">
        <div className="flex flex-col bg-gradient p-3.5 px-5 mb-5 rounded-[10px] gap-3.5 w-full max-w-125 relative ">
          {/* edit profile button */}

          <div className="flex sm:flex-row flex-col items-center gap-3.5">
            <div className="rounded-[100] sm:w-20 sm:h-20 w-12.5 h-12.5 relative  ">
              <Image
                src={profile?.companyLogo.url || dummyAvatar}
                fill
                alt="avtar"
                className="rounded-[100]"
              />
            </div>
            <div className="sm:text-2xl text-[1.5rem] font-bold">
              <span>{user.name}</span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="flex items-center gap-2.5 text-black sm:text-[14px] text-[12px]">
              <Phone size={16}></Phone> {profile?.phone}
            </span>
            <span className="flex items-center gap-2.5 text-black sm:text-[14px] text-[12px] lowercase">
              <Mail size={16}></Mail> {user.email}
            </span>
          </div>
        </div>

        <div className="capitalize">
          <div className="flex flex-col border-b border-outlined p-2.5 gap-0.5 ">
            <span className="text-black  font-bold text-[12px] ">
              Company Name
            </span>
            <span className="text-[14px]">{profile?.companyName}</span>
          </div>

          <div className="flex flex-col border-b border-outlined p-2.5  gap-0.5 ">
            <span className="text-black font-bold  text-[12px]  ">
              company type
            </span>
            <span className="text-[14px]">{profile?.companyType}</span>
          </div>

          <div className="flex flex-col border-b border-outlined p-2.5  gap-0.5 ">
            <span className="text-black font-bold  text-[12px]  ">
              company location
            </span>
            <span className="text-[14px]">{profile?.companyLocation}</span>
          </div>

          <div className="flex flex-col border-b border-outlined p-2.5  gap-0.5 ">
            <span className="text-black font-bold  text-[12px] ">
              company description
            </span>
            <span className="text-[14px]">{profile?.companyDescription}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
