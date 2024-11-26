import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pre-book 2025 Calendar by SujithNavam",
  description: "Get your art calendar at discounted price",
  icons: {
    icon: "/favicon.ico",
    // You can also specify different sizes and types
    apple: "/apple-touch-icon.png",
    shortcut: "/shortcut-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-slate-100 min-h-screen pt-6 pb-6">{children}</div>
      </body>
    </html>
  );
}
