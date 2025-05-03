import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NextTopLoader from "nextjs-toploader";
import Drawer from "@/components/Drawer";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Drizzle Library",
  description: "Crafted by using nextjs app router",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: ReactNode;
}>) {
  return (
    <html data-theme="dracula" lang="en">
      <body
        className={`${inter.className} xl:container w-full mx-auto min-h-screen`}
      >
        <NextTopLoader showSpinner={false} />
        <Drawer>
          <div className="w-full">
            {children}
            {modal}
          </div>
          <ToastContainer
            theme="dark"
            position="top-right"
            pauseOnFocusLoss={false}
            autoClose={3000}
          />
        </Drawer>
      </body>
    </html>
  );
}
