import Link from "next/link";

export const metadata = {
  title: "Checkout - SujithNavam Calendar | Kvika",
};

export default function Layout({ children }) {
  return (
    <div className="bg-slate-100 flex py-3 md:py-6 flex-col items-center w-full min-h-screen">
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
