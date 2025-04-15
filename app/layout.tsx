import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Source_Sans_3 as FontSans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const fontSans = FontSans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "SummerEase- AI powered PDF summerizer",
  description: "SummerEase is a platform for summerizing PDF documents",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${fontSans.variable} font-sans antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="relative flex min-h-screen flex-col">
              <ThemeToggle />
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster position="top-center" reverseOrder={false} />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
