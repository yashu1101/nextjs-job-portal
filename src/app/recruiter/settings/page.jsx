import AccessDenied from "@/components/AccessDenied";
import DeleteUserButton from "@/components/buttons/DeleteUserButton";
import { CurrentUser } from "@/lib/current-user";
import connectDB from "@/lib/db";
import { ChevronRight, UserPen, UserRoundX } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function SettingsPage() {
  // CONNECT DB
  await connectDB();

  // GET CURRENT USER

  const user = await CurrentUser();
  if (!user) {
    <AccessDenied></AccessDenied>;
  }

  return (
    <div className="w-full min-h-full bg-white p-2.5 flex flex-col">
      <div className="flex flex-col w-full max-w-100 gap-5">
        <span className="w-full font-semibold">Account</span>
        <div className="flex flex-col text-[12px] sm:text-[14px] gap-3.5">
          {/* UPDATE PROFILE  */}
          <div className=" relative w-full flex items-center gap-2.5 bg-blue-100 p-2 rounded-[10px]">
            <span>
              <UserPen></UserPen>
            </span>
            <div className="flex flex-col">
              <span className="font-semibold text-[14px] sm:text-[16px]">
                Update Profile
              </span>
              <span>update your profile</span>
            </div>
            <Link
              href={
                user.role === "candidate"
                  ? "/candidate/profile/update"
                  : user.role === "recruiter"
                    ? "/recruiter/profile/update"
                    : "#"
              }
              className="h-full absolute right-2 text-gray-700 flex items-center ">
              <ChevronRight></ChevronRight>
            </Link>
          </div>
          {/* DELETE ACCOUNT  */}
          <div className=" relative w-full flex items-center gap-2.5  bg-blue-100 p-2 rounded-[10px]">
            <span>
              <UserRoundX></UserRoundX>
            </span>
            <div className="flex flex-col">
              <span className="font-semibold text-[14px] sm:text-[16px] text-red-500">
                Delete Account
              </span>
              <span>your account and data will be delete permanantly.</span>
            </div>
            <span className="h-full absolute right-2 text-gray-700 flex items-center ">
              <DeleteUserButton></DeleteUserButton>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
