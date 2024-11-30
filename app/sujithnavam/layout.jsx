import Link from "next/link";

export const metadata = {
  title: "Pre-book 2025 Calendar by SujithNavam",
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
    title: "Pre-book 2025 Calendar by SujithNavam",
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
    <div className="pt-6 bg-slate-100 flex flex-col items-center w-full min-h-screen">
      <Link href="/">
        <div className="max-w-xl flex items-center gap-4 w-full mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="lucide lucide-arrow-left"
            viewBox="0 0 24 24">
            <path d="m12 19-7-7 7-7M19 12H5"></path>
          </svg>
          <span>Back to main site</span>
        </div>
      </Link>
      {children}
    </div>
  );
}
