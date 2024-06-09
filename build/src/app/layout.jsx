import { Inter } from "next/font/google";
import "./globals.css";
import MainNav from "@/components/MainNav";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ToastContainer } from "react-toastify";
import AuthProvider from "@/components/AuthProvider";
const inter = Inter({ subsets: ["latin"] });
export const metadata = {
    title: "RW-Rent OÜ | Internal System",
    description: "Developed by Zulfugar Abdullayev in Tallinn.",
};
export default function RootLayout({ children, }) {
    return (<html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <MainNav />
            <main>
              {children}
            </main>
            <ToastContainer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>);
}
