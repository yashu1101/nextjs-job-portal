import { User } from "@/models/user.model";
import { CurrentUser, RoleChecker } from "./current-user";
import connectDB from "./db";
import DeleteUserData from "./delete-user-data";

export default async function AdminDeleteUser(user) {

    try {
        // CONNECT DB 
        await connectDB()
        // GET CURRENT USER 
        const currentUser = await CurrentUser()
        if (!currentUser) {
            return {
                status: false,
                message: "Unauthorized"
            }
        }

        //CHECK ROLE

        const admin = RoleChecker(currentUser, 'admin')
        if (!admin) {
            return {
                status: false,
                message: "Unauthorized"
            }
        }

        // DELETE USER DATA 
        await DeleteUserData(user)
        // DELETE USER 

        await User.findOneAndDelete({ _id: user.id })

    } catch (error) {
        console.log(error.message)
        return {
            status: false,
            message: error.message || 'Something went wrong'
        }
    }
}