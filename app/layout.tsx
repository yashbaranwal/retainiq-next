import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/redux/providers";
import Metrics from "./metrics";
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: "RetainIQ",
  description:
    "RetainIQ simplifies dynamic creatives with adaptive text and image variables. Transform your designs into contextually relevant creatives at scale.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden">
        <Providers>{children}</Providers>
        <Toaster />
        <Metrics />
      </body>
    </html>
  );
}
