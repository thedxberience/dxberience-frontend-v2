"use client";
import Image from "next/image";
import React, { Suspense, useState } from "react";
import CustomButton from "./shared/CustomButton";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import AuthenticateModal from "./Auth/AuthenticateModal";
import TailoredExperienceBtn from "./shared/TailoredExperienceBtn";
import AdminAuthModal from "./Auth/AdminAuthModal";
import { useUserStore } from "@/store/userStore";
import CategoryDropdown from "./shared/CategoryDropdown";

const Navbar = () => {
  const [showNavMenu, setShowNavMenu] = useState(false);

  const pathname = usePathname();

  const invertRoutes = ["/dashboard", "/terms-conditions", "/privacy-policy"];

  const hideTailoredBtnPathname = [
    "/dashboard",
    "/admin",
    "/terms-conditions",
    "/privacy-policy",
  ];

  const handleShowNavMenu = () => {
    setShowNavMenu(!showNavMenu);
  };

  const user = useUserStore((state) => state.user);

  const invertStyles = invertRoutes.includes(pathname);

  const router = useRouter();

  return (
    <>
      {!hideTailoredBtnPathname.includes(pathname) && <TailoredExperienceBtn />}

      <div className="relative px-4 lg:px-20 z-50 lg:py-6 py-5 w-full hidden lg:flex justify-between items-center">
        <div className="flex justify-center relative w-[13.651vw] h-[60px] md:w-[172px] md:h-[42px] items-center">
          <Link
            href={"/"}
            className="relative w-[13.651vw] h-[60px] md:w-[172px] md:h-[42px] "
          >
            {invertStyles ? (
              <Image
                src="/dxberience_logo_black.png"
                alt="Dxberience Logo"
                fill
                className="object-cover"
              />
            ) : (
              <Image
                src="/dxberience_logo.svg"
                alt="Dxberience Logo"
                fill
                className="object-cover"
              />
            )}
          </Link>
        </div>

        <div className="nav-links flex justify-center items-center gap-12">
          <div
            className={`nav-link ${invertStyles ? "text-black" : "text-white"}`}
          >
            <ul
              className={`text-base flex justify-evenly items-center z-50 gap-8 ${
                invertStyles ? "text-black" : "text-white"
              }`}
            >
              <Suspense>{!user?.admin && <AuthenticateModal />}</Suspense>

              <li>
                <Link className="uppercase" href={"/about"}>
                  About
                </Link>
              </li>
              <CategoryDropdown />
              <li>
                <Link className="uppercase" href={"/tailored-experiences"}>
                  TAILORED EXPERIENCES
                </Link>
              </li>
              <li>
                <Link className="uppercase" href={"/partners"}>
                  Partners
                </Link>
              </li>
              <li>
                <Link className="uppercase" href={"/contact"}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="nav-button">
            {/* TODO: Optimize button for links */}
            <CustomButton
              isLink
              href="/explore-experiences/all"
              invert={invertStyles}
            />
          </div>
        </div>
      </div>
      <div className="mobile-nav z-50 relative flex flex-col lg:hidden w-full justify-between items-center px-3 py-6">
        <div className="flex w-11/12 justify-between items-center">
          <div
            className="flex flex-col justify-center items-center gap-1"
            onClick={handleShowNavMenu}
          >
            {!showNavMenu ? (
              <>
                <div
                  className={`hamburger ${invertStyles && "hamburger-black"}`}
                ></div>
                <div
                  className={`hamburger ${invertStyles && "hamburger-black"}`}
                ></div>
                <div
                  className={`hamburger ${invertStyles && "hamburger-black"}`}
                ></div>
              </>
            ) : (
              <div>
                {invertStyles ? (
                  <Image
                    src="/close_black.svg"
                    alt="close nav menu"
                    width={22.5}
                    height={22.5}
                  />
                ) : (
                  <Image
                    src="/close.svg"
                    alt="close nav menu"
                    width={22.5}
                    height={22.5}
                  />
                )}
              </div>
            )}
          </div>
          <div className="brand-logo">
            <div className="flex justify-center relative w-[31.538vw] h-[30px] items-center">
              <Link
                href={"/"}
                className="flex justify-center relative w-[31.538vw] h-[30px] items-center"
              >
                {invertStyles ? (
                  <Image
                    src="/dxberience_logo_black.png"
                    alt="Dxberience Logo"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <Image
                    src="/dxberience_logo.svg"
                    alt="Dxberience Logo"
                    fill
                    className="object-cover"
                  />
                )}
              </Link>
            </div>
          </div>
          <div>
            <CustomButton
              isLink
              href="/explore-experiences/all"
              invert={invertStyles}
            />
          </div>
        </div>
        <div
          className={`mobile-nav-menu p-4 relative z-50 w-full mt-5 ${
            showNavMenu ? "reveal-nav" : "hide-nav"
          }`}
        >
          <div className="bg-white w-full p-4 flex flex-col gap-4 uppercase">
            <ul className="flex flex-col gap-4">
              <div className="w-full flex justify-start items-start">
                <AuthenticateModal />
              </div>
              <li>
                <Link className="uppercase" href={"/about"}>
                  About
                </Link>
              </li>
              <li className="cursor-pointer">
                <Link href={"/partners"}>Partners</Link>
              </li>
              <li className="cursor-pointer">
                <Link href={"/contact"}>Contact</Link>
              </li>
              <li className="cursor-pointer">
                <CategoryDropdown />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
