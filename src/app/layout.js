
import { inter, poppins } from "@/util/font-provider";
import "./globals.css";
import { ToggleSidebarProvider } from "@/context/ToggleSidebarContext";
import { ToggleFilterProvider } from "@/context/ToggleFilterbarContext";



export const metadata = {
  title: "JobFinder - Find Your Dream Job",
  description: "Find your dream job easily on JobFinder.",
};

export default function RootLayout({ children }) {
  return (
    <ToggleSidebarProvider>
      <ToggleFilterProvider>

        <html lang="en" className={`${poppins.variable} ${inter.variable} h-full antialiased`}>

          <body className="h-full overflow-hidden">
            <main >
              {children}
            </main>
          </body>
        </html>
      </ToggleFilterProvider>
    </ToggleSidebarProvider>
  );
}
