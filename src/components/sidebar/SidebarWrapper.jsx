import { CurrentUser } from "@/lib/current-user";
import Sidebar from "@/components/sidebar/Sidebar";

export default async function SidebarWrapper() {
  //CHECK CURRENT USER
  const user = await CurrentUser();
  return <Sidebar user={user}></Sidebar>;
}
