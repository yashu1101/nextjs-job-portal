import { SaveJobAction } from "@/actions/job.action";
import {
  BrainCircuit,
  BriefcaseBusiness,
  ChefHat,
  Cloud,
  Computer,
  FolderCode,
  GlobeIcon,
  Hospital,
  Landmark,
  Palette,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import Link from "next/link";

export function JobCategory() {
  const categories = [
    {
      name: "web development",
      slug: "web-development",
      icon: <GlobeIcon></GlobeIcon>,
    },
    {
      name: "app development",
      slug: "app-development",
      icon: <Smartphone></Smartphone>,
    },
    {
      name: "software ",
      slug: "software-engineer",
      icon: <FolderCode></FolderCode>,
    },
    {
      name: "designer",
      slug: "designer",
      icon: <Palette></Palette>,
    },
    {
      name: "Ai Engineer",
      slug: "ai-engineer",
      icon: <BrainCircuit></BrainCircuit>,
    },
    {
      name: "DevOps and Cloud ",
      slug: "devops-and-cloud",
      icon: <Cloud></Cloud>,
    },
    {
      name: "Cyber Security",
      slug: "cyber-security",
      icon: <ShieldCheck></ShieldCheck>,
    },
  ];
  return (
    <div className="flex flex-wrap w-full items-center gap-2.5 justify-center mb-10">
      {categories?.map((category, index) => {
        return (
          <Link href={`/jobs/category/${category.slug}`} key={index} className="flex flex-col w-37.5 sm:w-50 p-2.5 items-center justify-cente gap-2 font-semibold capitalize text-nowrap border-[0.5px] border-transparent border-zinc-300 hover:border-black rounded-[10px] transition-all duration-300 cursor-pointer ">
          <span className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 mb-1">
              {category?.icon}
          </span>
            <span>{category?.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
