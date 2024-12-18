import Footer from "@/components/footer";
import Header from "@/components/header";

export const metadata = {
  title: "Buy 2025 Calendar by SujithNavam",
  description:
    "Table-Top Calendar, featuring 12 original paintings. Perfect for your desk or as a gift!",
  keywords: ["calendar 2025", "art calendar"],
  twitter: {
    card: "summary_large_image",
    title: "Pre-book 2025 Calendar by SujithNavam",
    description:
      "Table-Top Calendar, featuring 12 original paintings. Perfect for your desk or as a gift!",
    images: [
      "https://www.kvika.in/mockup.jpg", // Replace with your actual image URL
    ],
  },
  openGraph: {
    title: "Buy 2025 Calendar by SujithNavam",
    description:
      "Table-Top Calendar, featuring 12 original paintings. Perfect for your desk or as a gift!",
    url: "https://www.kvika.in/sujithnavam", // Replace with your actual page URL
    type: "website",
    images: [
      {
        url: "https://www.kvika.in/mockup_1200.jpg", // Replace with your actual image URL
        width: 1200,
        height: 960,
        alt: "Table-Top Calendar featuring original art by SujithNavam",
      },
    ],
  },
};

export default function Layout({ children }) {
  return (
    <div className="pt-6 bg-white flex flex-col items-center justify-between w-full min-h-screen">
      <div className="w-full max-w-7xl">
        <Header />
      </div>
      <div className="p-6 md:p-0">{children}</div>
      <div className="w-full max-w-7xl">
        <Footer />
      </div>
    </div>
  );
}
