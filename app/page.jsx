"use client";

import React from "react";
import Link from "next/link";
import Footer from "@/components/footer";
import Header from "@/components/header";

export default function page() {
  return (
    <div className="bg-white pt-6 max-w-7xl">
      <Header />
      <div className="px-6 md:px-12 py-14">
        <h1 className="font-light text-3xl md:text-5xl leading-normal md:leading-normal max-w-lg">
          Empowering <span className="font-medium">Artists</span>. Connecting
          Creativity with the World.
        </h1>
      </div>
      <div className="flex flex-col md:flex-row md:px-12 px-6 md:py-20 py-5">
        <img
          className="rounded-xl max-h-[500px]"
          src="/mockup.jpg"
          alt="calendar"
        />
        <div className="flex flex-col mt-12 md:mt-0 md:px-12 justify-between">
          <div className="flex flex-col">
            <p className="text-red-400">New Launch</p>
            <h2 className="text-2xl text-slate-800">
              2025 Artistic Calendar by{" "}
            </h2>
            <a
              target="_blank"
              href="https://www.facebook.com/artpageofvtsujith"
              className="flex items-center mt-6 gap-4 hover:translate-x-2 transition">
              <img className="max-h-28 rounded-full" src="/sujith.jpg" alt="" />
              <p className="text-slate-500 text-2xl">SujithNavam</p>
            </a>
          </div>
          <div className="flex flex-col items-start">
            <p className="text-slate-600 mt-4">
              Table-Top Calendar, featuring 12 original paintings. <br />{" "}
              Perfect for your desk or as a gift!
            </p>
            <p className="text-lg text-slate-800 my-4">
              Pre-booking has started, with only limited numbers available.
            </p>
            <Link
              data-splitbee-event="Buy now sujith"
              className="bg-red-400 shadow-md hover:bg-green-500 p-4 px-6 text-white font-medium rounded-md"
              href="/sujithnavam">
              Buy Now Rs.399/-
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
