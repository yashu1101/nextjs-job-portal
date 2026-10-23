"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function SetPassword() {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, setIsPending] = useState(false);

  const router = useRouter();

  const handleResetPassword = async () => {
    setErrorMessage("");

    try {
      setIsPending(true);

      const token = new URLSearchParams(window.location.search).get("token");

      if (!token) {
        setErrorMessage("Invalid or expired reset link.");
        return;
      }

      const { data, error } = await authClient.resetPassword({
        newPassword: password,
        token,
      });

      if (error) {
        setErrorMessage("Failed to reset password. Try again.");
        return;
      }

      if (data?.status) {
        router.push("/auth/login");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsPending(false);
    }
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
            disabled={isPending}
            className={`${isPending ? "bg-orange-500 pointer-events-none" : "bg-blue-600"}  rounded-[10px] p-2.5 text-white font-bold hover:bg-blue-700 mt-4 transition-all duration-300 ease-in`}>
            {isPending ? "Reseting password..." : "Reset Password"}
          </button>

          <span className="text-red-500 font-medium py-2.5">
            {errorMessage}
          </span>
        </div>
      </div>
    </div>
  );
}
