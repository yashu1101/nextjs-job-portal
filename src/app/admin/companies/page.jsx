import RecruitersTable from "@/components/table/RecruitersTable";
import connectDB from "@/lib/db";
import { User } from "@/models/user.model";

export default async function AdminCompanies() {
  // CONNECT DB
  await connectDB();
  // FETCH ALL CANDIDATES
  const recruiters = await User.find({ role: "recruiter" });

  console.log(recruiters);

  return (
    <RecruitersTable
      companies={JSON.parse(JSON.stringify(recruiters))}></RecruitersTable>
  );
}
