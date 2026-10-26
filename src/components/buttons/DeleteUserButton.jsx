"use client";
import { authClient } from "@/lib/auth-client";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DeleteUserButton() {
  const [isPannelShow, setIsPannelShow] = useState(false);
  const [hasPassword, setHasPassword] = useState(null);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, setIsPending] = useState(false);

  const router = useRouter();

  // CHECK PROVIDER
  const fetchAccounts = async () => {
    const { data: account } = await authClient.listAccounts();

    const accounts = account.some((acc) => acc.providerId === "credential");

    setHasPassword(accounts);
  };
  useEffect(() => {
    fetchAccounts();
  }, []);

  // DELETE USER (IF USER HAS PASSWORD)

  const deletePasswordUser = async () => {
    setErrorMessage("");
    try {
      setIsPending(true);
      if (!password.trim()) {
        setErrorMessage("Please enter your password");
        return;
      }

      const { error } = await authClient.deleteUser({
        password,
      });

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      router.replace("/auth/signup");
    } catch (error) {
      console.log(error.message || "Something went wrong");
    } finally {
      setIsPending(false);
    }
  };

  // DELETE USER (IF USER LOGGED IN THROUGH SOCIAL PROVIDER)

  const deleteUser = async () => {
    setErrorMessage("");
    try {
      setIsPending(true);
      const { error } = await authClient.deleteUser();
      if (error) {
        setErrorMessage(error.message);
        return;
      }
      router.replace("/auth/signup");
    } catch (error) {
      console.log(error.message || "Something went wrong");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="relative normal-case">
      {isPannelShow && (
        <div className="fixed top-0 left-0 w-full h-dvh flex items-center justify-center text-white z-[100] backdrop-brightness-50 p-2.5">
          <div className="w-full max-w-100 flex flex-col items-center p-5 py-10 gap-5 bg-white rounded-[10px]">
            <span className="text-black font-medium text-[16px] mb-5">
              Are you sure to delete account ?
            </span>
            {/* PASSWORD FIELD  */}
            {hasPassword && (
              <div className="w-full text-black flex flex-col gap-1 sm:text-[14px] text-[12px]">
                <label className="px-2 font-medium " htmlFor="password">
                  Enter your account password
                </label>
                <input
                  className="border border-zinc-300 w-full p-2.5 rounded-[10px] "
                  type="text"
                  name="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="text-red-500">{errorMessage}</span>
              </div>
            )}
            <div className="flex flex-col gap-2.5 w-full ">
              <button
                disabled={isPending}
                className={`flex-1 ${isPending ? "bg-orange-500" : "bg-red-500"}  p-2.5 rounded-[10px] text-white font-semibold transition-all ease-in duration-200`}
                onClick={hasPassword ? deletePasswordUser : deleteUser}>
                {isPending ? "Processing.." : "Proceed to Delete"}
              </button>
              <button
                disabled={isPending}
                className="flex-1 bg-zinc-500 p-2.5 rounded-[10px] text-white font-semibold"
                onClick={() => setIsPannelShow(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <button
        
        onClick={() => setIsPannelShow(!isPannelShow)}>
        <ChevronRight></ChevronRight>
      </button>
    </div>
  );
}
