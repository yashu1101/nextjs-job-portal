import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function AdminLayout({ children }) {
  // const session = await auth.api.getSession({
  //     headers: await headers(),
  //   });
  //   console.log("ADMIN LAYOUT SESSION:", session.user);
  return (
    <div className="h-screen w-screen flex flex-col ">
      {/* 1. Navbar */}
      <Navbar />

      <div className="flex flex-1 h-full min-h-0 overflow-hidden">
        <Sidebar />

        <div className="flex-1 h-full min-h-0 overflow-y-auto sm:px-6 px-2.5  ">
          {children}
        </div>
      </div>

      {/* <Footer></Footer> */}
    </div>
  );
}
