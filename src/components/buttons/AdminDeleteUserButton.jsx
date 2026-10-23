"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminDeleteUserButton({ userId }) {
  const [isPannelShow, setIsPannelShow] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const handleDeleteUser = async () => {
    setErrorMessage("");
    try {
      setIsPending(true);
      const { error } = await authClient.admin.removeUser({
        userId,
      });

      if (error) {
        setErrorMessage(error.message);
      }

      setIsPannelShow(false);
    } catch (error) {
      setErrorMessage(error.message || "Something went wrong");
    } finally {
      setIsPending(true);
    }
  };

  return (
    <div className="relative normal-case">
      {isPannelShow && (
        <div className="fixed top-0 left-0 w-full h-dvh flex items-center justify-center text-white z-[100] backdrop-brightness-50 p-2.5">
          <div className="w-full max-w-100 flex flex-col items-center p-5 py-10 gap-5 bg-white rounded-[10px]">
            <span className="text-black font-medium text-[16px] mb-5">
              Are you sure to delete this user ?
            </span>

            <div className="flex flex-col gap-2.5 w-full ">
              <button
                disabled={isPending}
                className={`flex-1 ${isPending ? "bg-orange-500" : "bg-red-500"}  p-2.5 rounded-[10px] text-white font-semibold transition-all ease-in duration-200`}
                onClick={handleDeleteUser}>
                {isPending ? "Processing.." : "Proceed to Delete"}
              </button>
              <button
                disabled={isPending}
                className="flex-1 bg-zinc-500 p-2.5 rounded-[10px] text-white font-semibold"
                onClick={() => setIsPannelShow(false)}>
                Cancel
              </button>
            </div>
            <span className="text-red-500">{errorMessage}</span>
          </div>
        </div>
      )}
      <button
        className="p-2.5 py-2 bg-red-500 rounded-[10px] text-white font-semibold"
        onClick={() => setIsPannelShow(!isPannelShow)}>
        Delete User
      </button>
    </div>
  );
}
