import { Heart, ScanFace } from "lucide-react";

export default function Footer() {
  return (
    <footer>
      <div className="flex flex-col w-full h-50 bg-white gap-10 p-5 relative">
        <span className="text-2xl font-medium" >JobFinder</span>
        <div className="flex w-full items-center justify-center">
          <div className="flex gap-2.5">
            <Heart></Heart>
            <Heart></Heart>
            <Heart></Heart>
            <Heart></Heart>
          </div>
        </div>
        <span className="text-center absolute bottom-0 left-0 w-full p-2.5  " >©2026 JobFinder. All rights reserved.</span>
      </div>
    </footer>
  );
}
