"use client";
import Image from "next/image";
import React, { useState } from "react";
import CustomButton from "./shared/CustomButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthenticateModal from "./Auth/AuthenticateModal";

const Navbar = () => {
  const [showNavMenu, setShowNavMenu] = useState(false);

  const handleShowNavMenu = () => {
    setShowNavMenu(!showNavMenu);
  };

  const router = useRouter();

  return (
    <>
      <div className="relative px-4 lg:px-20 z-50 lg:py-6 py-5 w-full hidden lg:flex justify-between items-center">
        <div className="flex justify-center relative w-[13.651vw] h-[60px] lg:w-[262.1px] lg:h-[64px] items-center">
          <Link href={"/"}>
            <Image
              src="/dxberience_logo.svg"
              alt="Dxberience Logo"
              fill
              className="object-cover"
            />
          </Link>
        </div>

        <div className="nav-links flex justify-center items-center gap-12">
          <div className="nav-link text-white">
            <ul className="text-base flex justify-evenly items-center z-50 gap-8">
              <li>
                <Link className="uppercase" href={"/about"}>
                  About
                </Link>
              </li>
              <AuthenticateModal />
              <li>
                <Link className="uppercase" href={"/contact"}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="nav-button">
            {/* TODO: Optimize button for links */}
            <CustomButton isLink href="/explore-experiences/all" />
          </div>
        </div>
      </div>
      <div className="mobile-nav z-50 relative flex flex-col lg:hidden w-full justify-between items-center px-4 py-6">
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
              <Link href={"/"}>
                <Image
                  src="/dxberience_logo.svg"
                  alt="Dxberience Logo"
                  fill
                  className="object-cover"
                />
              </Link>
            </div>
          </div>
          <div>
            <CustomButton isLink href="/explore-experiences/all" />
          </div>
        </div>
        <div
          className={`mobile-nav-menu p-4 relative z-50 w-full mt-5 ${
            showNavMenu ? "reveal-nav" : "hide-nav"
          }`}
        >
          <div className="bg-white w-full p-4 flex flex-col gap-4 uppercase">
            <ul className="flex flex-col gap-4">
              <li>
                <Link className="uppercase" href={"/about"}>
                  About
                </Link>
              </li>
              <div className="w-full flex justify-start items-start">
                <AuthenticateModal />
              </div>

              <li className="cursor-pointer">
                <Link href={"/contact"}>Contact</Link>
              </li>
              <li className="cursor-pointer">
                <Link href={"/explore-experiences/all"}>Experiences</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
