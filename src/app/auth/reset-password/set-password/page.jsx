"use client";;
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
export default function SetPassword() {
  const [password, setPassword] = useState("");


  const handleResetPassword = async () => {
    const token = new URLSearchParams(window.location.search).get("token");

    if (!token) {
      // Handle the error
    }
    const { data, error } = await authClient.resetPassword({
      newPassword: password, 
      token, 
    });
  };

  return (
    <div className="flex w-full min-h-dvh items-center justify-center">
      <div className="flex flex-col items-center max-w-100 w-full bg-white p-10 rounded-[10px]">
        <span className="font-bold sm:text-2xl text-[1.3rem]">
          Reset your password
        </span>
        <div className="flex flex-col text-[14px] w-full gap-1.5 mt-10">
          <label htmlFor="password" className="font-semibold">
            New Password
          </label>
          <input
            type="text"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            className="border border-zinc-300 rounded-[10px] p-2.5"
          />

          <button
            onClick={handleResetPassword}
            className="bg-blue-600 rounded-[10px] p-2.5 text-white font-bold hover:bg-blue-700 mt-4 transition-all duration-300 ease-in">
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
}
