import { amazonLogo, googleLogo, metaLogo } from "@/util/image-provider";
import Image from "next/image";
import Link from "next/link";

export default function TopCompanyCard() {
  const companies = [
    {
      name: "Google",
      logo: googleLogo,
      href: "#",
    },
    {
      name: "Meta",
      logo: metaLogo,
      href: "#",
    },
    {
      name: "Amazone",
      logo: amazonLogo,
      href: "#",
    },
    {
      name: "Amazone",
      logo: amazonLogo,
      href: "#",
    },
    {
      name: "Google",
      logo: googleLogo,
      href: "#",
    },
    {
      name: "Meta",
      logo: metaLogo,
      href: "#",
    },
    {
      name: "Amazone",
      logo: amazonLogo,
      href: "#",
    },
    {
      name: "Amazone",
      logo: amazonLogo,
      href: "#",
    },
  ];
  return (
    <div className="flex sm:gap-5 gap-2.5 w-full max-w-225 flex-wrap  items-center justify-center">
      {companies?.map((company, index) => {
        return (
          <Link href={company?.href} key={index}>
            <div className=" w-37.5 sm:w-50 border border-zinc-200 rounded-[10px] p-5 flex flex-col items-center bg-white  hover:border-black transition-all duration-300 ">
              <div
                className={` relative sm:w-25 w-20 sm:h-12.5 h-7.5 ${company?.name === "Amazone" && "invert "} `}>
                <Image src={company?.logo} width={300} height={200} alt={company?.name} />
              </div>
              <div className="border-b mt-2.5 border-outlined"></div>

              <div className="w-full mt-1 flex items-center justify-center">
                <span className="">{company?.name}</span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
