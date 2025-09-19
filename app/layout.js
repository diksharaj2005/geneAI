import { Geist, Geist_Mono,Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import Header from "../components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "../components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inter = Inter({
  subsets:["latin"]
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "GeneAI",
  description: "Your AI-powered guide to career success",
  icons: {
    icon: "/browsericon.png", 
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider  appearance={{
      baseTheme:dark,
    }}>
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className}`}
      >
       <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Header/>
          <main className="min-h-screen">
  {children}
          </main>
           <Toaster richColors />
          <footer className="bg-muted/90 py-4">
            <div className="container  mx-auto px-4 text-center text-gray-200">
              <p className="text-md font-semibold">All Righs Reserved.</p>
              <p className="text-sm font-bold">Made with 💗 by Diksha Raj</p>
            </div>
          </footer>
          </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
