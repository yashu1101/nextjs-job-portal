import { betterAuth } from "better-auth";
// import { admin } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import SendMail from "./send-mail";
import DeleteUserData from "./delete-user-data";

const client = new MongoClient(process.env.MONGO_URL);
const db = client.db();


export const auth = betterAuth({
    database: mongodbAdapter(db, {

        client
    }),

    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        // PASSWORD RESET LINK 
        sendResetPassword: async ({ user, url, token }, request) => {
            await SendMail({
                to: user.email,
                subject: "Reset your password",
                text: `Click the link to reset your password: ${url}`,
            });
        },
        onPasswordReset: async ({ user }, request) => {
            // your logic here
            console.log(`Password for user ${user.email} has been reset.`);
        },

    },

    // EMAIL VERIFICATION LINK 

    emailVerification: {
        sendVerificationEmail: async ({ user, url, token }, request) => {
            await SendMail({
                to: user.email,
                subject: "Verify your email address",
                text: `Click the link to verify your email: ${url}`,
            });
        },

    },

    // SOCIAL PROVIDER (GOOGLE OAuth) 
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        },

    },

    user: {
        additionalFields: {
            role: {
                type: "string",
                required: false,

                input: true,
            },
        },

        deleteUser: {
            enabled: true,
            beforeDelete: async (user) => {

                await DeleteUserData(user)

            },
        }
    },
    plugins: [
        // admin(),
        nextCookies()
    ],

});

export {db}