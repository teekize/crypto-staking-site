import { StakingProvider } from "@/context/StakingContext";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cause Coin",
  description: "Cause Capitalism. The Currency for Humanity.",
  icons: {
    icon: [{ url: "/cause-fav.svg", type: "image/svg+xml" }],
    shortcut: "/cause-fav.svg",
    apple: "/cause-fav.svg",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/cause-fav.svg",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-white`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <StakingProvider>
            <div className="flex flex-col min-h-screen">
              <main className="flex-grow">{children}</main>
            </div>
            <Toaster />
          </StakingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
