import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kvika | Art and Decor",
  description: "Connecting Creativity with the World.",
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
        <div className="bg-white min-h-screen items-center flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
