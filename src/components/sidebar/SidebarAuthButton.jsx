"use client";
import Link from "next/link";

export default function SidebarAuthButton() {
  return (
    <div className="flex items-center w-full mt-5 mb-7.5 p-2.5 pb-10 border-b gap-2.5 border-outlined ">
      <Link
        href={"/auth/login"}
        className="flex-1 w-20 max-w-20 flex  shadow-2xl shadow-blue-600 duration-300 items-center justify-center py-2 px-2.5 font-medium  rounded-[10px] bg-blue-600 hover:bg-blue-700 hover:shadow-none text-white">
        Login
      </Link>
      <Link
        href={"/auth/signup"}
        className="flex-1 w-20 max-w-20 flex items-center justify-center py-2 px-2.5 font-medium border border-gray-400 rounded-[10px] hover:bg-gray-100 hover:border-gray-500 transition duration-300">
        Signup
      </Link>
    </div>
  );
}
