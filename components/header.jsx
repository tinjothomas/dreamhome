import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <div className="flex justify-between px-6 md:px-12 items-center">
      <Link href="/">
        <img src="/kvika-logo.svg" />
      </Link>
      <nav className="flex gap-6">
        <Link href="/about">About us</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    </div>
  );
}
