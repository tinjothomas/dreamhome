import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kvika | Art and Decor",
  description: "Connecting Creativity with the World.",
  icons: {
    icon: "favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-white min-h-screen items-center flex flex-col">
          {children}
        </div>
        <Script
          strategy="lazyOnload"
          async
          src="https://cdn.splitbee.io/sb.js"
        />
      </body>
    </html>
  );
}
