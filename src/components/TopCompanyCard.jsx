import connectDB from "@/lib/db";
import { RecruiterProfile } from "@/models/recruiter.profile.model";
import Image from "next/image";
import Link from "next/link";

export default async function TopCompanyCard() {
  // CONNECT DB
  await connectDB();
  // FETCH COMPANIES ( RECRUITERS )
  const companies = await RecruiterProfile.find().lean();
  if (!companies) {
    console.log("Companies not found");
  }


  return (
    <div className="flex sm:gap-5 gap-2.5 w-full max-w-225 flex-wrap  items-center justify-center">
      {companies?.map((company) => {
        return (
          <Link href={`/jobs/company/${company?.companyName}`} key={company?._id}>
            <div className=" w-37.5 sm:w-50 border border-zinc-200 rounded-[10px] p-5 flex flex-col items-center bg-white  hover:border-black transition-all duration-300 ">
              <div
                >
                <Image
                  src={company?.companyLogo?.url}
                  width={300}
                  height={200}
                  alt={company?.companyLogo}
                  className={` sm:w-25 w-20 h-auto ${company?.companyName === "Amazone" && "invert "} `}
                />
              </div>
              <div className="border-b mt-2.5 border-outlined"></div>

              <div className="w-full mt-1 flex items-center justify-center capitalize font-medium">
                <span className="">{company?.companyName}</span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
