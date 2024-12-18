"use client";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import { Card } from "@/components/ui/card";

export const Slider = () => {
  const images = [
    {
      id: 1,
      url: "/1.jpg",
      alt: "Nature landscape",
      caption: "Beautiful mountain vista",
    },
    {
      id: 2,
      url: "/2.jpg",
      alt: "City skyline",
      caption: "Urban architecture",
    },
    {
      id: 3,
      url: "/3.jpg",
      alt: "Ocean view",
      caption: "Serene seascape",
    },
  ];
  return (
    <div className="w-full max-w-96 md:max-w-2xl max-h-64 md:max-h-full rounded-lg overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        className="md:h-[500px]">
        {images.map((image) => (
          <SwiperSlide key={image.id}>
            <div className="relative h-full">
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default function Product() {
  return (
    <div className="flex flex-col md:flex-row md:px-12 px-6 md:py-20 py-5">
      {/* <img
        className="rounded-xl max-h-[500px]"
        src="/mockup.jpg"
        alt="calendar"
      /> */}
      <Slider />
      <div className="flex flex-col mt-8 md:mt-0 md:px-12 px-6 justify-between z-10">
        <div className="flex flex-col">
          <p className="text-red-400">New Launch</p>
          <h2 className="text-2xl text-slate-800">
            2025 Artistic Calendar by{" "}
          </h2>
          <a
            target="_blank"
            href="https://www.facebook.com/artpageofvtsujith"
            className="flex items-center mt-6 gap-4 hover:translate-x-2 transition">
            <img
              className="md:max-h-28 max-h-14 rounded-full"
              src="/sujith.jpg"
              alt=""
            />
            <p className="text-slate-500 text-xl md:text-2xl">SujithNavam</p>
          </a>
        </div>
        <div className="flex flex-col items-start">
          <p className="text-slate-600 mt-4">
            Table-Top Calendar, featuring 12 original paintings. <br /> Perfect
            for your desk or as a gift!
          </p>
          <p className="text-lg px-3 py-1 border border-dashed border-green-300 rounded-md bg-green-50 text-green-800 my-4">
            - 🚚 Free Shipping<br></br> - All India delivery in 4-6 days.
          </p>
          <div className="flex gap-6 mb-2 w-full items-center">
            <p className="line-through text-slate-700 text-2xl">Rs.399</p>
            <p className=" text-green-700 text-2xl">Rs.368/-</p>
          </div>
          <Link
            data-splitbee-event="Checkout"
            className="bg-red-400 w-full md:max-w-36 flex justify-center shadow-md hover:bg-green-500 p-4 px-6 text-white font-medium rounded-md"
            href="/checkout">
            Buy Now
          </Link>
        </div>
      </div>
    </div>
  );
}
