import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "aChord",
  description: "Find songs by their chords",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="font-sans bg-purple-900 w-full z-20 top-0 start-0 border-b border-default">
          <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
            <span className="self-center text-3xl text-white font-bold">aChord</span>
            <div className="hidden w-full md:block md:w-auto" id="navbar-default">
              <ul
                className="flex p-0 mt-0 rounded-base flex-row space-x-2"
              >
                <li>
                  <Link href="/">
                    <button className="w-36 h-12 rounded-xl bg-purple-800 text-white hover:bg-purple-600 active:bg-purple-400">
                      Home
                    </button>
                  </Link>
                </li>
                <li>
                  <Link href="/editor">
                    <button className="w-36 h-12 rounded-xl bg-purple-800 text-white hover:bg-purple-600 active:bg-purple-400">
                      Editor
                    </button>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
