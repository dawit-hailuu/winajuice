import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["400", "600", "700", "900"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Wina Juice ዊና ጁስ — Fresh, Healthy & Delicious in Summit Fiyel Bet",
  description:
    "Wina Juice ዊና ጁስ in Summit Fiyel Bet, Addis Ababa serves the freshest juices, smoothies, fruit salads, and Ethiopian coffee. View our menu, find our location, and order on WhatsApp.",
  keywords: [
    "Wina Juice",
    "ዊና ጁስ",
    "Summit Fiyel Bet",
    "Addis Ababa juice",
    "Ethiopian smoothies",
    "fresh juice Addis Ababa",
    "avocado juice Ethiopia",
    "spris",
  ],
  authors: [{ name: "Wina Juice" }],
  openGraph: {
    title: "Wina Juice ዊና ጁስ — Fresh, Healthy & Delicious",
    description: "Fresh, Healthy, and Delicious Juices in Summit Fiyel Bet, Addis Ababa.",
    type: "website",
    locale: "en_ET",
    siteName: "Wina Juice",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wina Juice ዊና ጁስ",
    description: "Fresh, Healthy, and Delicious Juices in Summit Fiyel Bet, Addis Ababa.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FBF5E5" },
    { media: "(prefers-color-scheme: dark)", color: "#0F1A14" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${fraunces.variable} ${jakarta.variable}`}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
