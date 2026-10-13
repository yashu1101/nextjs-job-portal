import { headers } from "next/headers";
import { auth } from "./auth";

// GET CURRENT USER
export async function CurrentUser() {
    try {
        const headerList = await headers();
        const session = await auth.api.getSession({
            headers: headerList,
        });

        if (!session?.user) return null;

        return session.user;
    } catch (error) {
        console.error("Error while getting current user:", error);
        return null;
    }
}

// GET USER ROLE 
export function RoleChecker(user, role) {
    if (!user) return false;
    return user.role === role;
}