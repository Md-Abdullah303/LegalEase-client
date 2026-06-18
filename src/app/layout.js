import { Poppins } from "next/font/google";
import "./globals.css";
// import Navbar from "@/component/heared/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/component/sheared/Footer";
import { Toaster } from "react-hot-toast";
import Navbar2 from "@/component/sheared/Navbar2";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "LegalEase | Homepage",
  description:
    "LegalEase is a digital platform that connects legal seekers, clients, and businesses with talented lawyers. The platform allows users to browse, discover, and hire legal experts. Lawyers can offer and manage their legal services after a one-time verification payment, while an admin oversees the entire system.",
};

export default function RootLayout({ children }) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${poppins.className}  h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar2 />
          <main className="">{children}</main>
          <Footer />
          <div>
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
