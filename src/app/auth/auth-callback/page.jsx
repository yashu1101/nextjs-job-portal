import { CurrentUser } from "@/lib/current-user";
import { redirect } from "next/navigation";

export default async function AuthCallback() {
  const user = await CurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  if (!user.role) {
    redirect("/auth/role-select");
  }

  if (user.role === "candidate") {
    redirect("/candidate/dashboard");
  }

  if (user.role === "recruiter") {
    redirect("/recruiter/dashboard");
  }

  redirect("/auth/login");
}