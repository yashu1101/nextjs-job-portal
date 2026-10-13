"use client";

import { authClient } from "@/lib/auth-client";
import { Loader, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Logout() {
  const router = useRouter();

  const [logoutPannel, setLogoutPannel] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleLogoutPannel = () => {
    setLogoutPannel(!logoutPannel);
  };

  const handleLogout = async () => {
    setIsPending(true);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/home"); // redirect to login page
          setIsPending(false);
          setLogoutPannel(false);
        },
      },
    });
  };
  return (
    <div>
      <li
        onClick={handleLogoutPannel}
        className={` cursor-pointer flex items-center gap-3.5 list-none  w-full  rounded-[10px]  p-2.5 z-50 transition-all duration-300  text-red-500 font-semibold `}>
        <LogOut size={17}></LogOut> Logout
      </li>

      {logoutPannel && (
        <div className="z-10 fixed left-0 top-0 flex items-center justify-center w-full min-h-dvh backdrop-brightness-50 text-black  font-semibold">
          <div className="flex flex-col gap-10 justify-center items-center max-w-100 w-full bg-white p-5 py-10 rounded-[10px] border border-[#7373732e]">
            <span className="text-[1.2rem]">Are you sure to logout ?</span>
            <div className="flex w-full gap-2.5">
              <button onClick={handleLogout} disabled={isPending} className={`flex-1 flex gap-1.5 items-center justify-center p-2.5 border border-zinc-300 ${isPending ? 'bg-gray-500 text-white' : 'bg-transparent'}  rounded-[10px] font-semibold transition-all duration-300`}>
                {isPending ? (
                  <>
                    Logging out... <Loader className="animate-spin" size={16} />
                  </>
                ) : (
                  "Logout"
                )}
              </button>
              <button
              disabled={isPending}
                onClick={handleLogoutPannel}
                className="flex-1 flex items-center justify-center p-2.5 bg-red-500 text-white rounded-[10px] font-semibold">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
