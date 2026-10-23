import Searchbar from "@/components/Searchbar";
import CandidatesTable from "@/components/table/CandidatesTable";
import connectDB from "@/lib/db";
import { CandidateProfile } from "@/models/candidate.profile.model";
import { User } from "@/models/user.model";
import { Eye, Trash } from "lucide-react";
import Link from "next/link";

export default async function AdminCandidates() {
  // CONNECT DB 
  await connectDB()
  // FETCH ALL CANDIDATES
  const candidates = await User.find({role:'candidate'})
  

  return (
    <CandidatesTable
      candidates={JSON.parse(JSON.stringify(candidates))}></CandidatesTable>
  );
}
