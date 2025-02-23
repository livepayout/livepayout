import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });
import "react-toastify/dist/ReactToastify.css";
export const metadata: Metadata = {
  title: "Live Payout",
  description:
    "An Streaming platform who pays you for being here ane doing streams.",
};
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Script from "next/script";
import { Suspense } from "react";
import { IoNotifications } from "react-icons/io5";
import { FaFacebook, FaTelegram, FaTwitch, FaTwitter } from "react-icons/fa";
import { X } from "lucide-react";
import { BsTwitterX } from "react-icons/bs";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en">
        <head>
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
        </head>

        {/* <!-- Google tag (gtag.js) --> */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-ZSR4YXKNWQ"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
                 window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());

                  gtag('config', 'G-ZSR4YXKNWQ');
              `,
          }}
        ></script>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9875272114341775"
          crossOrigin="anonymous"
        />
        <body className={`${inter.className} relative`}>
          <Suspense>
            <ThemeProvider
              attribute="class"
              forcedTheme="dark"
              storageKey="gamehub-theme"
            >
              <Toaster theme="light" position="bottom-center" />
              {children}
            </ThemeProvider>
          </Suspense>
          <div className="flex justify-between bottom-0 z-[50000] items-center fixed w-full left-0 bg-purple-300 p-4">
            <p className="flex items-center gap-2">
              {" "}
              <IoNotifications className="text-xl"/>
              <span className="text-zinc-600">
                Be part of our community, Join our social networks
              </span>
            </p>
            <div className="flex items-center gap-2">
              <BsTwitterX className="bg-black/80 text-white p-1 text-2xl rounded-sm" />
              <FaTwitter className="bg-black/80 text-white p-1 text-2xl rounded-sm" />
              <FaFacebook className="bg-black/80 text-white p-1 text-2xl rounded-sm" />
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
