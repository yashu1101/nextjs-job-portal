import { Poppins, Inter } from "next/font/google";

export const poppins = Poppins({
    variable: "--font-poppins",
    subsets: ['latin'],
    weight: ['200', "300", '400', "500", "600"]
})
export const inter = Inter({
    variable: "--font-inter",
    subsets: ['latin'],
    weight: ['200', "300", '400', "500", "600"]
})