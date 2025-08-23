"use client";
import Image from "next/image";
import React, { Suspense, useState } from "react";
import CustomButton from "./shared/CustomButton";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
// import TailoredExperienceBtn from "./shared/TailoredExperienceBtn";
import CategoryDropdown from "./shared/CategoryDropdown";

const NavbarContent = () => {
  const [showNavMenu, setShowNavMenu] = useState(false);

  const pathname = usePathname();

  const invertRoutes = [
    "/terms-conditions",
    "/privacy-policy",
    "/email-center",
  ];

  const hideTailoredBtnPathname = [
    "/terms-conditions",
    "/privacy-policy",
    "/email-center",
  ];

  const handleShowNavMenu = () => {
    setShowNavMenu(!showNavMenu);
  };

  const invertStyles = invertRoutes.includes(
    pathname.split("/").slice(0, 2).join("/")
  );

  return (
    <>
      {/* {!hideTailoredBtnPathname.includes(
        pathname.split("/").slice(0, 2).join("/")
      ) && <TailoredExperienceBtn />} */}

      <nav className="flex-center w-full">
        <div className="relative w-11/12 z-50 lg:py-6 py-5 hidden xl:flex justify-between items-center">
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

          <div className="nav-links flex justify-center items-center gap-10">
            <div
              className={`nav-link ${
                invertStyles ? "text-black" : "text-white"
              }`}
            >
              <ul
                className={`text-base flex justify-evenly items-center z-50 gap-6 2xl:gap-8 ${
                  invertStyles ? "text-black" : "text-white"
                }`}
              >
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
                <li>
                  <Link
                    className="uppercase"
                    href={"https://valens.jetluxe.com/affiliate/dxberiencejets"}
                  >
                    Book a private jet
                  </Link>
                </li>
                {/* Authentication disabled - login functionality removed */}
                {/* <li className="flex-center">
                  <Suspense>{!user?.admin && <AuthenticateModal />}</Suspense>
                </li> */}
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
        <div className="mobile-nav z-50 relative flex flex-col xl:hidden w-full justify-between items-center py-6">
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
                minWidth={false}
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
                <li>
                  <Link className="uppercase" href={"/about"}>
                    About
                  </Link>
                </li>
                <li className="cursor-pointer">
                  <CategoryDropdown />
                </li>
                <li>
                  <Link className="uppercase" href={"/tailored-experiences"}>
                    TAILORED EXPERIENCES
                  </Link>
                </li>
                <li className="cursor-pointer">
                  <Link href={"/partners"}>Partners</Link>
                </li>
                <li className="cursor-pointer">
                  <Link href={"/contact"}>Contact</Link>
                </li>
                <li>
                  <Link
                    className="uppercase"
                    href={"https://valens.jetluxe.com/affiliate/dxberiencejets"}
                  >
                    Book a private jet
                  </Link>
                </li>
                {/* Authentication disabled - login functionality removed */}
                {/* <div className="w-full flex justify-start items-start">
                  <AuthenticateModal />
                </div> */}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

// Wrapper component with Suspense boundary
const Navbar = () => {
  return (
    <Suspense fallback={<div className="h-20 bg-transparent"></div>}>
      <NavbarContent />
    </Suspense>
  );
};

export default Navbar;
