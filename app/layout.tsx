import "./global.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Navbar } from "@/components/nav";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "@/components/footer";
import { baseUrl } from "@/sitemap";

export const baseTitle = "Dheeraj Mahra - Frontend Engineer";
const baseDescription = `Software Engineer focused on frontend systems and user experience, with a background in building products at startups. If I'm not coding, I'm probably reading about automobiles or playing piano.`;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: baseTitle,
    template: `${"%s"} | ${baseTitle}`
  },
  description: baseDescription,
  openGraph: {
    title: baseTitle,
    description: baseDescription,
    url: baseUrl,
    siteName: baseTitle,
    locale: "en_US",
    type: "website"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={cx(
        "bg-white text-black dark:bg-black dark:text-white",
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <body className="mx-4 mt-8 max-w-xl antialiased lg:mx-auto">
        <main className="mt-6 flex min-w-0 flex-auto flex-col px-2 md:px-0">
          <Navbar />
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  );
}
