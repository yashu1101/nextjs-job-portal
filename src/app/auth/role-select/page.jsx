"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

export default function RoleSelect() {
  const [role, setRole] = useState(null);

  const router = useRouter();

//   CHECK ALREADY LOGGED IN USER 

useEffect(() => {
    const checkRole = async () => {
      const { data: session, error } = await authClient.getSession();

      if (error || !session?.user) {
        router.replace("/auth/login");
        return;
      }

      if (session.user.role === "candidate") {
        router.replace("/candidate/dashboard");
        return;
      }

      if (session.user.role === "recruiter") {
        router.replace("/recruiter/dashboard");
        return;
      }

    
    };

    checkRole();
  }, [router]);

  //   UPDATE ROLE AFTER SIGNUP

  const updateRole = async () => {
    if (!role) return;

    const { data, error } = await authClient.updateUser({
      role,
    });

    // Pehle error check
    if (error) {
      console.log("Role update error:", error);
      return;
    }

    console.log("Role updated:", data);

    // get session
    const { data: session, error: sessionError } =
      await authClient.getSession();

    if (sessionError) {
      console.log("Session error:", sessionError);
      return;
    }

    if (session?.user?.role === "candidate") {
      router.push("/candidate/dashboard");
    } else if (session?.user?.role === "recruiter") {
      router.push("/recruiter/dashboard");
    } else {
      router.push("/auth/login");
    }
  };

  return (
    <div className="w-full min-h-dvh flex items-center justify-center">
      <div className="flex flex-col gap-5 justify-center items-center max-w-100 w-full p-5">
        <span className="sm:text-[2rem] text-[1.5rem]">What's your role ?</span>
        <div className="flex gap-2.5 items-center w-full">
          <div className="flex justify-between w-full gap-2.5 ">
            <label className="cursor-pointer flex-1">
              <input
                type="radio"
                name="role"
                onChange={(e) => setRole(e.target.value)}
                value="candidate"
                className="peer hidden"
              />

              <div className=" text-[12px] sm:text-[14px] flex items-center justify-center rounded-[10px] border border-violet-800 py-2.5 px-2.5 peer-checked:border-violet-800 peer-checked:bg-violet-800 peer-checked:text-white transition">
                Candidate
              </div>
            </label>

            <label className="cursor-pointer flex-1">
              <input
                type="radio"
                name="role"
                onChange={(e) => setRole(e.target.value)}
                value="recruiter"
                className="peer hidden"
              />

              <div className=" text-[12px] sm:text-[14px] flex items-center justify-center rounded-[10px] border border-purple-900 py-2.5 px-2.5 peer-checked:border-purple-900 peer-checked:bg-purple-900 peer-checked:text-white transition">
                Recruiter
              </div>
            </label>
          </div>
        </div>

        {role && (
          <button
            onClick={updateRole}
            className="m-5 w-full p-2.5 bg-violet-800 text-white font-semibold rounded-[10px] text-[14px]">
            Countinue{" "}
          </button>
        )}
      </div>
    </div>
  );
}
