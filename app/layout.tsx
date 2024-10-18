import { StakingProvider } from "@/context/StakingContext";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/header";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cause Staking Platform",
  description: "Stake your crypto and earn rewards",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} bg-gradient-to-b from-yellow-400 to-yellow-400 overflow-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <StakingProvider>
            <div className="flex flex-col h-screen">
              <Header />
              <main className="flex-grow overflow-hidden">
                <div className="container h-full mx-auto px-4">
                  {children}
                </div>
              </main>
            </div>
            <Toaster />
          </StakingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
