"use client";
import Image from "next/image";
import React, { useState } from "react";
import CustomButton from "./shared/CustomButton";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [showNavMenu, setShowNavMenu] = useState(false);

  const handleShowNavMenu = () => {
    setShowNavMenu(!showNavMenu);
  };

  const router = useRouter();

  return (
    <>
      <div className="px-4 lg:px-20 lg:py-6 py-5 w-full hidden lg:flex justify-between items-center">
        <div className="flex justify-center relative w-[13.651vw] h-[60px] lg:w-[406.9px] lg:h-[100px] items-center">
          <Image
            src="/dxberience_logo.svg"
            alt="Dxberience Logo"
            fill
            className="object-contain"
          />
        </div>

        <div className="nav-links flex justify-center items-center gap-12">
          <div className="nav-link text-white">
            <ul className="text-base">
              <li>
                <Link href={"/contact"}>Contact</Link>
              </li>
            </ul>
          </div>
          <div className="nav-button">
            <CustomButton onClick={() => router.push("/explore-experiences")} />
          </div>
        </div>
      </div>
      <div className="mobile-nav relative flex flex-col lg:hidden w-full justify-between items-center px-4 py-6">
        <div className="flex w-full justify-between items-center">
          <div
            className="flex flex-col justify-center items-center gap-1"
            onClick={handleShowNavMenu}
          >
            {!showNavMenu ? (
              <>
                <div className="hamburger"></div>
                <div className="hamburger"></div>
                <div className="hamburger"></div>
              </>
            ) : (
              <div>
                <Image
                  src="/close.svg"
                  alt="close nav menu"
                  width={22.5}
                  height={22.5}
                />
              </div>
            )}
          </div>
          <div className="brand-logo">
            <div className="flex justify-center relative w-[31.538vw] h-[30px] items-center">
              <Image
                src="/dxberience_logo.svg"
                alt="Dxberience Logo"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div>
            <CustomButton />
          </div>
        </div>
        <div
          className={`mobile-nav-menu p-4 w-full mt-5 ${
            showNavMenu ? "reveal-nav" : "hide-nav"
          }`}
        >
          <div className="bg-white w-full p-4 flex flex-col gap-4">
            <ul className="flex flex-col gap-4">
              <li className="cursor-pointer">
                <Link href={"/contact"}>Contact</Link>
              </li>
              <li className="cursor-pointer">
                <Link href={"/experiences"}>Experiences</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
