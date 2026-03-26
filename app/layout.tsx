import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Syne } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Next Level Media Events and Communication PLC",
    template: "%s | Next Level Media",
  },
  description:
    "Award-winning African media production company specializing in TV Commercials, Music Albums, Social Media Content, Films, and Live Events. Based in Addis Ababa, Ethiopia.",
  keywords: [
    "media production Ethiopia",
    "TV commercial production Addis Ababa",
    "film production Ethiopia",
    "music video production",
    "corporate video Ethiopia",
    "Next Level Media",
    "African production company",
  ],
  authors: [{ name: "Next Level Media Events and Communication PLC" }],
  creator: "Next Level Media",
  publisher: "Next Level Media Events and Communication PLC",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nextlevelmedia.et",
    title: "Next Level Media Events and Communication PLC",
    description:
      "Where Vision Becomes Legacy. Award-winning media production company in Ethiopia.",
    siteName: "Next Level Media",
  },
  twitter: {
    card: "summary_large_image",
    title: "Next Level Media",
    description: "Where Vision Becomes Legacy",
    creator: "@nextlevelmedia",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#070708",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${syne.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased bg-bg text-text font-sans">
        <CustomCursor />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
