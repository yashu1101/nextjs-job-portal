'use server';
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { isRedirectError } from "next/dist/client/components/redirect-error"

// SIGNUP ACTION
export async function SignupAction(previousState, formdata) {

    try {
        const {
            name,
            email,
            password,
            role
        } = Object.fromEntries(formdata);

        if (!name || !email || !password || !role) {
            return {
                status: false,
                message: "All fields are required!"
            };
        }

        const data = await auth.api.signUpEmail({
            body: {
                name,
                email,
                password,
                role
            }

        });

        console.log("Signup successful:", data);

        if (data.user) {
            redirect("/auth/login");
        }

        return {
            status: true,
            message: "Account created successfully.",
            data
        };

    } catch (error) {
        if (isRedirectError(error)) {
            throw error;
        }
        console.log("Signup error:", error);

        return {
            status: false,
            message: error.message || "Signup failed."
        };
    }
}


// lOGIN ACTION
export async function LoginAction(previousState, formdata) {
    try {

        const {

            email,
            password,

        } = Object.fromEntries(formdata);

        if (!email || !password) {
            return {
                status: false,
                message: "All fields are required!"
            };
        }
        const data = await auth.api.signInEmail({
            body: {
                email,
                password,
                rememberMe: true,

            },
            headers: await headers(),

        });

        console.log("User logged in successfully:", data);



        if (data.user.role === "recruiter") {
            redirect("/recruiter/dashboard");
        }

        if (data.user.role === "admin") {
            redirect("/admin/dashboard");
        }

        redirect("/candidate/dashboard");

    } catch (error) {
        if (isRedirectError(error)) {
            throw error;
        }
        console.error("Login error:", error);
        return {
            status: false,
            message: error.message || "An error occurred while logging in"
        }
    }

}

