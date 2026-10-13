"use client";
import { ToggleSidebarContext } from "@/context/ToggleSidebarContext";

import { useContext } from "react";

import ProfileBar from "@/components/sidebar/ProfileBar";
import SidebarMenu from "./SidebarMenu";
import SidebarAuthButton from "./SidebarAuthButton";
export default function Sidebar({ user }) {
  const { isSidebarOpen } = useContext(ToggleSidebarContext);

  return (
    <div
      className={`flex flex-col bg-white sm:shadow-none shadow-[4px_8px_20px_#e9e9e9]   h-full items-center  p-3.5 overflow-hidden sidebar-lg sidebar-md  text-[0.8rem]  ${isSidebarOpen ? "toggle-sidebar" : ""} `}>
      {/* SIDEBAR PROFILE BAR*/}
      {user && <ProfileBar user={user} />}

      {/* SIDEBAR LOGIN BUTTON*/}

      {!user && <SidebarAuthButton></SidebarAuthButton>}

      {/* SIDEBAR MENU */}
      <SidebarMenu user={user}></SidebarMenu>
    </div>
  );
}
