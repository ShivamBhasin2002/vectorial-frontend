import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import Navbar from "@components/navbar";
import "react-toastify/dist/ReactToastify.css"; 

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Vectorial AI App",
  description:
    "This is an app that lets u chat with the context of ur product to get meaningful insights",
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
        <Navbar />
        <div className="w-screen h-screen font-[family-name:var(--font-geist-sans)] pl-[290px]">
          {children}
        </div>
      </body>
    </html>
  );
}
