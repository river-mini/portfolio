import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  display: "swap",
});

const SITE_NAME = "Cindy Truong";
const SITE_TITLE = "Cindy Truong — Designer";
const SITE_DESCRIPTION =
  "Portfolio of Cindy Truong, a multidisciplinary designer working across UI/UX, motion design, and graphic design.";

export const metadata: Metadata = {
  // Absolute URLs for the OG image are built from this. Update it if the site
  // moves to a custom domain.
  metadataBase: new URL("https://cindytruong.vercel.app"),
  title: { default: SITE_TITLE, template: `%s — ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/images/og.png",
        width: 1200,
        height: 630,
        alt: SITE_TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/images/og.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // No height on <html>: Lenis measures documentElement.scrollHeight and
    // watches that element for resizes, so pinning it to 100% of the viewport
    // leaves the observer silent as content grows and the scroll clamps short.
    // The sticky footer uses dvh on <body> instead, which needs no parent
    // height to resolve against.
    <html lang="en" className={instrumentSans.variable}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="bg-bg text-ink focus:ring-ink sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100 focus:rounded-xs focus:px-4 focus:py-2"
        >
          Skip to content
        </a>

        <SmoothScroll />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
