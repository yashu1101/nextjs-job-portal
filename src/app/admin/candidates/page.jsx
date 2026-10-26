import AccessDenied from "@/components/AccessDenied";
import Searchbar from "@/components/Searchbar";
import CandidatesTable from "@/components/table/CandidatesTable";
import { CurrentUser, RoleChecker } from "@/lib/current-user";
import connectDB from "@/lib/db";
import { CandidateProfile } from "@/models/candidate.profile.model";
import { User } from "@/models/user.model";
import { Eye, Trash } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AdminCandidates() {
  // CONNECT DB
  await connectDB();

  // GET CURRENT USER

  const user = await CurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  // CHECK ROLE

  const admin = RoleChecker(user, "admin");

  if (!admin) {
    return <AccessDenied></AccessDenied>;
  }

  // FETCH ALL CANDIDATES
  const candidates = await User.find({ role: "candidate" });

  return (
    <CandidatesTable
      candidates={JSON.parse(JSON.stringify(candidates))}></CandidatesTable>
  );
}
