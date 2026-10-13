"use client";

import { ToggleSidebarContext } from "@/context/ToggleSidebarContext";
import { Menu } from "lucide-react";
import { useContext, useState } from "react";

export default function Navbar() {
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isSidebarOpen, setIsSidebarOpen } = useContext(ToggleSidebarContext);
  // console.log(isSidebarOpen);
  return (
    <header className=" w-full  ">
      <div className="w-full h-15 bg-white relative flex items-center p-2 gap-2.5 ">
        <div
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="cursor-pointer">
          <Menu></Menu>
        </div>

        <div>
          <span className="text-2xl font-bold">
            Job<span className="text-blue-600" >Finder</span>{" "}
          </span>
        </div>
      </div>
    </header>
  );
}
