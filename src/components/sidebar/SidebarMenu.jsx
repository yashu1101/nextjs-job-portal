"use client";
import {
  Bookmark,
  BriefcaseBusiness,
  Building,
  CircleQuestionMark,
  FileText,
  Headset,
  Home,
  Info,
  LayoutDashboard,
  Settings,
  User,
} from "lucide-react";
import Link from "next/link";

import { usePathname } from "next/navigation";
import Logout from "./Logout";
import { useContext } from "react";
import { ToggleSidebarContext } from "@/context/ToggleSidebarContext";
export default function ({ user }) {
  const pathname = usePathname();
  const { isSidebarOpen, setIsSidebarOpen } = useContext(ToggleSidebarContext);

  const sidebarItems = [
    {
      name: "Home",
      href: "/home",
      icon: <Home size={17}></Home>,
      role: ["admin", "candidate", "recruiter", "public"],
    },
    {
      name: "Dashboard",
      href: "/candidate/dashboard",
      icon: <LayoutDashboard size={17}></LayoutDashboard>,
      role: ["candidate"],
    },
    {
      name: "Dashboard",
      href: "/recruiter/dashboard",
      icon: <LayoutDashboard size={17}></LayoutDashboard>,
      role: ["recruiter"],
    },
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: <LayoutDashboard size={17}></LayoutDashboard>,
      role: ["admin"],
    },
    {
      name: "Jobs",
      href: "/jobs",
      icon: <BriefcaseBusiness size={17}></BriefcaseBusiness>,
      role: ["candidate", "public"],
    },
    {
      name: "Jobs",
      href: "/recruiter/jobs",
      icon: <BriefcaseBusiness size={17}></BriefcaseBusiness>,
      role: ["recruiter"],
    },

    {
      name: "Saved",
      href: "/candidate/saved-jobs",
      icon: <Bookmark size={17}></Bookmark>,
      role: ["candidate"],
    },
    {
      name: "Application",
      href: "/candidate/application",
      icon: <FileText size={17}></FileText>,
      role: ["candidate"],
    },
    {
      name: "Application",
      href: "/recruiter/application",
      icon: <FileText size={17}></FileText>,
      role: ["recruiter"],
    },

    {
      name: "Candidates",
      href: "/admin/candidates",
      icon: <User size={17}></User>,
      role: ["admin"],
    },
    {
      name: "Companies",
      href: "/admin/companies",
      icon: <Building size={17}></Building>,
      role: ["admin"],
    },

    {
      name: "Help & Support",
      href: "/help",
      icon: <CircleQuestionMark size={17}></CircleQuestionMark>,
      role: ["candidate", "recruiter", "public"],
    },
    {
      name: "Contact Us",
      href: "/contact",
      icon: <Headset size={17}></Headset>,
      role: ["candidate", "recruiter", "public"],
    },
    {
      name: "About Us",
      href: "/about",
      icon: <Info size={17}></Info>,
      role: ["candidate", "recruiter", "public"],
    },
    {
      name: "Settings",
      href: "/candidate/settings",
      icon: <Settings size={17}></Settings>,
      role: ["candidate"],
    },
    {
      name: "Settings",
      href: "/recruiter/settings",
      icon: <Settings size={17}></Settings>,
      role: ["recruiter"],
    },
  ];
  const role = user?.role || "public";
  const filteredItems = sidebarItems.filter((item) => item.role.includes(role));
  return (
    <div className="w-full text-[0.8rem]">
      <ul className="flex flex-col  w-full">
        {filteredItems?.map((item) => {
          return (
            <li
              key={item.href}
              onClick={() => {
                if (window.innerWidth < 768) {
                  setIsSidebarOpen(false);
                }
              }}>
              <Link
                href={item.href}
                className={`flex items-center gap-3.5 list-none  w-full  rounded-[10px]  p-2.5 z-50 transition-all duration-300 ${pathname == item.href && "bg-gradient"} ${item.name === "Logout" && "text-red-500 font-semibold"} `}>
                {item.icon} {item.name}
              </Link>
            </li>
          );
        })}

        {user && <Logout></Logout>}
      </ul>
    </div>
  );
}
