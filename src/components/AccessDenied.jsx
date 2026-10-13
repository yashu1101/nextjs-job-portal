import { Lock } from "lucide-react";

export default function AccessDenied() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center justify-center ">
        <span className="text-[8rem] opacity-15 font-black leading-28 -z-10" >403</span>
        {/* <span><Lock className="absolute" ></Lock></span> */}
        <span className="text-[1.2rem] tracking-[2px]" >Access Denied</span>
      </div>
    </div>
  );
}
