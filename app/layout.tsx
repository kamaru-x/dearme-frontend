import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ApiProvider } from "./context/ApiContext";
import { DeleteModalProvider } from "./context/DeleteModalContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Dear Me",
  description: "Personal Diary Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ApiProvider>
          <DeleteModalProvider>
            {children}
          </DeleteModalProvider>
        </ApiProvider>
      </body>
    </html>
  );
}
