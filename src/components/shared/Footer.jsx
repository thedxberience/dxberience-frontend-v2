/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
function Footer() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
  }, []);

  function openWhatsapp() {
    window.open("https://wa.me/918800000000", "_blank");
  }

  function toPageTop() {
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  return (
    <footer className="footer relative flex flex-col w-full h-[454px] 2xl:h-[526px] bg-bottom bg-cover 2xl:py-5">
      <div className="w-full flex justify-center z-20">
        <div className="relative w-[223.79px] 2xl:w-[325.52px] h-[80px] pt-[30px]">
          <Link href="/">
            <Image src="/dxberience_logo.svg" alt="logo" fill />
          </Link>
        </div>
      </div>

      <div className="absolute inset-0 bg-[#171010] bg-opacity-90 z-10" />
      <div className="relative z-20 text-white">
        <div className="px-8 2xl:flex justify-between">
          <h1 className="py-2 text-2xl font-bold font-IvyPresto ">
            No need to think, just experience
          </h1>

          <ul className="mb-10 text-xs text-[#FFFFFF] font-extralight 2xl:flex gap-5 ">
            <li className="mt-4">
              <Link href={"/explore-experiences"}>EXPERIENCES</Link>
            </li>
            <li className="mt-4">
              <Link href={"/contact"}>CONTACT</Link>
            </li>
          </ul>
        </div>

        <div className="flex justify-center items-center text-sm gap-[80px] border-t-[1px] border-b-[1px] h-[112.01px] 2xl:h-[252.01px] border-white">
          <div className="flex flex-col items-center p-4 gap-5">
            <span>CONTACT US</span>
            <img src="/footer_whatsapp.png" alt="logo" />
          </div>

          <div className="h-[50px] w-[1px] bg-white bg-opacity-50" />

          <div className="flex flex-col items-center p-4 gap-5">
            <span>FOLLOW US</span>
            <img src="/footer_insta.png" alt="logo" />
          </div>
        </div>

        <ul className="flex justify-evenly pt-5 md:text-transparent">
          <li>Terms & Conditions</li>
          <li>Privacy Policy</li>
        </ul>
      </div>
      <div className="flex flex-col fixed right-5 bottom-60 md:right-32 md:bottom-40 gap-5 z-30">
        <img
          className="md:hidden"
          src="/whatsapp_logo.png"
          alt="logo"
          width={40}
          onClick={openWhatsapp}
        />
        <img
          className={`md:hidden ${scrolled ? "block" : "hidden"}`}
          src="/to_page_top.png"
          alt="logo"
          width={40}
          onClick={toPageTop}
        />

        <img
          className="hidden md:block"
          src="/whatsapp_logo.png"
          alt="logo"
          width={50}
          onClick={openWhatsapp}
        />
        <img
          className={`hidden md:block  ${scrolled ? "block" : "hidden"}`}
          src="/to_page_top.png"
          alt="logo"
          width={50}
          onClick={toPageTop}
        />
      </div>
    </footer>
  );
}

export default Footer;
