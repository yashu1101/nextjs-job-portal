import { Sticker } from "lucide-react";
export default function NotFoundPage() {
  return (
    <div className="w-full h-dvh flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-2.5">
        <Sticker size={80} ></Sticker>
        <span className="sm:text-2xl text-[18px]" >Page Not Found</span>
        <div className="flex gap-2.5">
          <button className="sm:w-[100px] w-[80px] px-2.5 py-2 border-0 rounded-[10px] bg-pink-600 ">Back</button>
          <button className="sm:w-[100px] w-[80px] px-2.5 py-2 border-0 rounded-[10px] bg-purple-900 ">Home</button>
        </div>
      </div>
    </div>
  );
}
