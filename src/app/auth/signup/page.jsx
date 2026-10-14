"use client";
import Link from "next/link";
import { SignupAction } from "@/actions/auth.action";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useActionState, useEffect } from "react";
import { Loader } from "lucide-react";
import GoogleAuth from "@/components/buttons/GoogleAuth";

export default function Signup() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && session) {
      if (session.user.role === "candidate")
        router.replace("/candidate/dashboard");
      if (session.user.role === "recruiter")
        router.replace("/recruiter/dashboard");
      if (session.user.role === "admin") router.replace("/admin/dashboard");
    }
  }, [session, isPending, router]);

  const initialState = {
    status: false,
    message: "",
  };

  const [state, dispatchAction, isSignupPending] = useActionState(
    SignupAction,
    initialState,
  );

  return (
    <div className="flex w-full h-dvh items-center justify-center bg-background">
      <div className="flex flex-col  w-full max-w-[500] px-5 md:px-12.5  py-4 bg-white sm:h-auto h-full">
        <span className="sm:text-2xl text-2xl text-center my-6 font-bold">
          Create an account
        </span>
        <div>
          <div
            className={`w-full text-center sm:text-[14px] text-[12px] ${state.status === true ? "text-green-500" : "text-red-500"}`}>
            <span>{state.message}</span>
          </div>
          <form
            action={dispatchAction}
            className="flex flex-col items-center w-full gap-2.5 ">
            <div className="flex flex-col items-baseline w-full">
              <label
                className="py-1.25 px-1.25 text-[12px] sm:text-[14px] "
                htmlFor="name">
                Full Name
              </label>
              <input
                className="w-full border border-zinc-300 py-2.5 px-2.5 rounded-[10px] text-[12px] sm:text-[14px]"
                type="text"
                name="name"
                id="name"
                placeholder="enter your name"
              />
            </div>
            <div className="flex flex-col items-baseline w-full">
              <label
                className="py-1.25 px-1.25 text-[12px] sm:text-[14px] "
                htmlFor="email">
                Email
              </label>
              <input
                className="w-full border border-zinc-300 py-2.5 px-2.5 rounded-[10px] text-[12px] sm:text-[14px]"
                type="text"
                name="email"
                id="email"
                placeholder="enter your email"
              />
            </div>
            <div className="flex flex-col items-baseline w-full">
              <label
                className="py-1.25 px-1.25 text-[12px] sm:text-[14px] "
                htmlFor="email">
                Password
              </label>
              <input
                className="w-full border border-zinc-300 py-2.5 px-2.5 rounded-[10px] text-[12px] sm:text-[14px]"
                type="text"
                name="password"
                id="password"
                placeholder="enter your password"
              />
            </div>
            <div className="flex flex-col items-baseline w-full">
              <label
                className="py-1.25 px-1.25 text-[12px] sm:text-[14px] "
                htmlFor="email">
                Role
              </label>
              <div className="flex justify-between w-full gap-2.5 ">
                <label className="cursor-pointer flex-1">
                  <input
                    type="radio"
                    name="role"
                    value="candidate"
                    className="peer hidden"
                  />

                  <div className=" text-[12px] sm:text-[14px] flex items-center justify-center rounded-[10px] border border-zinc-300 py-2.5 px-2.5 peer-checked:border-zinc-300 peer-checked:bg-zinc-300 transition">
                    Candidate
                  </div>
                </label>

                <label className="cursor-pointer flex-1">
                  <input
                    type="radio"
                    name="role"
                    value="recruiter"
                    className="peer hidden"
                  />

                  <div className=" text-[12px] sm:text-[14px] flex items-center justify-center rounded-[10px] border border-zinc-300 py-2.5 px-2.5 peer-checked:border-zinc-300 peer-checked:bg-zinc-300 transition">
                    Recruiter
                  </div>
                </label>
              </div>
            </div>
            <div className="flex flex-col items-baseline w-full mt-1.5 ">
              <button
                className={`w-full flex items-center justify-center ${isSignupPending ? "pointer-events-none " : ""}bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-2.5 rounded-[10px] transition-all duration-500 `}
                type="submit">
                {isSignupPending ? (
                  <Loader className="animate-spin" size={17}></Loader>
                ) : (
                  " Sign Up"
                )}
              </button>
            </div>
            <div className="flex items-center">
              <span>OR</span>
            </div>
            <div className="flex  w-full p-2.5 px-0 gap-2.5 items-center  rounded-[10px]">
              <GoogleAuth></GoogleAuth>
            </div>
            <span className="text-[12px] sm:text-[14px]">
              Alraedy have acoount ?{" "}
              <Link className="text-violet-800" href={"/auth/login"}>
                Login
              </Link>{" "}
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}
