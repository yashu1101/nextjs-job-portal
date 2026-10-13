"use client";
import { LoginAction } from "@/actions/auth.action";
import GithubAuth from "@/components/buttons/GithubAuth";
import GoogleAuth from "@/components/buttons/GoogleAuth";

import { authClient } from "@/lib/auth-client";
import { formImage } from "@/util/image-provider";
import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Loader } from "lucide-react";
import Image from "next/image";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useActionState, useEffect } from "react";

export default function Login() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  // REDIRECT USER

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

  const [state, dispatchAction, isLoginPending] = useActionState(
    LoginAction,
    initialState,
  );

  return (
    <div className="flex w-full h-dvh items-center justify-center bg-background">
      <div className="flex flex-col  w-full max-w-[500] px-5 md:px-12.5 py-5 md:py-[21px] bg-white">
        <span className="sm:text-2xl text-2xl text-center my-6">Login</span>
        <div>
          <div
            className={`w-full text-center sm:text-[14px] text-[12px] ${state.status === true ? "text-green-500" : "text-red-500"}`}>
            <span>{state.message}</span>
          </div>
          <form
            action={dispatchAction}
            className="flex flex-col items-center w-full gap-5 ">
            <div className="flex flex-col items-baseline w-full">
              <label
                className="py-1.25 px-1.25 text-[12px] sm:text-[14px]"
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
                htmlFor="password">
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

            <div className="flex flex-col items-baseline w-full mt-1.5 ">
              <button
                className={`w-full flex justify-center items-center ${isLoginPending ? " pointer-events-none " : ""}bg-blue-600 text-white py-2.5 px-2.5 rounded-[10px] transition-all duration-500`}
                type="submit">
                {isLoginPending ? (
                  <Loader size={17} className="animate-spin"></Loader>
                ) : (
                  "Login"
                )}
              </button>
            </div>
            <div className="flex items-center">
              <span>OR</span>
            </div>
            <div className="flex  w-full p-2.5 px-0 gap-2.5 items-center  rounded-[10px]">
              <GoogleAuth></GoogleAuth>
              <GithubAuth></GithubAuth>
            </div>
            <span className="text-[12px] sm:text-[14px]">
              <Link href={"/auth/forgot-password"}>Forgot password ?</Link>{" "}
            </span>
            <span className="text-[12px] sm:text-[14px]">
              Don't have acoount ?{" "}
              <Link className="text-violet-800" href={"/auth/signup"}>
                Signup
              </Link>{" "}
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}
