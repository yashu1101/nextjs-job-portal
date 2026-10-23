"use client";
import { authClient } from "@/lib/auth-client";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [isLinkSent, setIsLinkSent] = useState(false);
  const [isPending, setIsPending] = useState(false);

  // RESET PASSWORD FUNCTION

  const sendResetPasswordLink = async () => {
    try {
      setIsPending(true);
      const { data, error } = await authClient.requestPasswordReset({
        email,
        redirectTo: "/auth/reset-password/set-password",
      });

      if (data?.status) {
        setIsLinkSent(true);
      }
    } catch (error) {
      console.log(error.message || "reset password failed.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="flex w-full min-h-dvh items-center justify-center p-2.5">
      <div className="relative flex flex-col items-center max-w-100 w-full bg-white py-10 px-5 rounded-[10px] overflow-hidden">
        <span className="font-bold sm:text-2xl text-[1.3rem]">
          Reset your password
        </span>
        <div className="flex flex-col text-[14px] w-full gap-1.5 mt-10">
          <label htmlFor="email" className="font-semibold">
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            className="border border-zinc-300 rounded-[10px] p-2.5"
          />

          <button
            disabled={isLinkSent || isPending}
            onClick={sendResetPasswordLink}
            className={`${isLinkSent ? "bg-green-500 pointer-events-none " : isPending ? "bg-orange-500 pointer-events-none " : "bg-blue-600"}  rounded-[10px] p-2.5 text-white font-bold hover:bg-blue-700 mt-4 transition-all duration-300 ease-in`}>
            {isLinkSent
              ? "Reset link sent successfully."
              : isPending
                ? "Sending Link.."
                : "Send Reset Link"}
          </button>
        </div>

        {/* SUCCESS MESSAGE  */}

        {isLinkSent && (
          <div className="absolute left-0 top-0 w-full h-full flex flex-col items-center justify-center text-white font-semibold  bg-green-500 p-5 gap-5">
            <CheckCircle size={40}></CheckCircle>
            <span>
              Password reset link sent successfully to your email address.
            </span>
            <span className="text-[14px] ">Check your inbox</span>
          </div>
        )}
      </div>
    </div>
  );
}
