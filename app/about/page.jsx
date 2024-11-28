"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="md:px-12 scroll-px-6 md:py-14 py-7">
      <h1 className="font-light text-3xl text-slate-900 leading-normal max-w-lg">
        <span className="font-medium">Kvika</span>, a homegrown design brand
        from{" "}
        <span>
          <a
            className="hover:text-red-400 transition"
            href="http://www.coredes.io?ref=kvika.in"
            target="_blank">
            Coredes Interactive
          </a>
        </span>
        , focuses on creating and building products to make your house
        beautiful.
      </h1>
    </div>
  );
}
