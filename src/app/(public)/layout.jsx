import FilterBar from "@/components/FilterBar";
import Navbar from "@/components/Navbar";
import SidebarWrapper from "@/components/sidebar/SidebarWrapper";

export default async function PublicLayout({ children }) {
  return (
    <div className="h-screen w-screen flex flex-col gap-3 ">
      {/* 1. Navbar */}
      <Navbar />

      <div className="flex flex-1 h-full min-h-0 overflow-hidden">
        <SidebarWrapper></SidebarWrapper>

        <div className="flex-1 h-full min-h-0 overflow-y-auto sm:px-6 px-2.5  ">
          {children}
        </div>


      </div>

      {/* <Footer></Footer> */}
    </div>
  );
}
