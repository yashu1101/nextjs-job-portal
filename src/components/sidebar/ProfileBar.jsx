"use client";
import { GetProfile } from "@/actions/profile.action";
import { dummyAvatar } from "@/util/image-provider";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfileBar({ user }) {
  const pathname = usePathname();

  const [profile, setProfile] = useState(null);

  // GET USER PROFILE PHOTO

  useEffect(() => {
    async function fetchUserProfile() {
      const result = await GetProfile();

      setProfile(result);
    }

    fetchUserProfile();
  }, []);

  let profilePhoto;

  if (user?.role === "candidate") {
    profilePhoto = profile?.profile?.profilePhoto?.url;
  }
  if (user?.role === "recruiter") {
    profilePhoto = profile?.profile?.companyLogo?.url;
  }

  const profileRoutes = {
    candidate: "/candidate/profile",
    recruiter: "/recruiter/profile",
    admin: "/admin/profile",
  };

  const profileRoute = profileRoutes[user.role] || "/auth/login";

  return (
    <div className="w-full py-7.5  mb-5 ">
      <Link href={profileRoute}>
        <div
          className={`flex items-center w-full gap-2.5  border border-outlined rounded-[10px] ${pathname === "/profile" ? "bg-gradient" : ""} `}>
         <div className="flex items-center w-full gap-2.5 p-2.5">
           <Image
            src={profilePhoto || dummyAvatar}
            width={30}
            height={30}
            alt="avtar"
            className="rounded-[100px]"
          />
          <span className="font-medium">{user.name.trim()}</span>
         </div>
          <ChevronRight></ChevronRight>
        </div>
      </Link>
    </div>
  );
}
