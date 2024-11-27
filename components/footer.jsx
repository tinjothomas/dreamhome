import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="bg-gray-100 mt-8">
      <div className="md:px-12 px-6 py-6 flex gap-12">
        <div>
          <nav className="flex flex-col gap-2">
            <Link href="/">Home</Link>
            <Link href="/about">About us</Link>
            <Link href="/contact">Contact us</Link>
          </nav>
        </div>
        <div>
          <nav className="flex flex-col gap-2">
            <Link href="/policies/terms-and-conditions">
              Terms and Conditions
            </Link>
            <Link href="/policies/cancellation-and-returns">
              Cancellation and Returns
            </Link>
            <Link href="/policies/privacy-policy">Privacy Policy</Link>
          </nav>
        </div>
      </div>
      <div className="flex justify-between items-center md:px-12 px-6 py-8 border-t">
        <p>© 2024 Kvika.in by Coredes Interactive</p>
        <p>
          Designed by{" "}
          <span>
            <a href="https://coredes.io?ref=kvika.in" target="_blank">
              coredes.io
            </a>
          </span>
        </p>
      </div>
    </div>
  );
}
