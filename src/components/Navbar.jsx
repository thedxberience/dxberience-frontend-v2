import Image from "next/image";
import React from "react";
import CustomButton from "./shared/CustomButton";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="px-4 lg:px-20 lg:py-6 py-5 w-full flex justify-between items-center">
      <div className="flex justify-center relative w-[13.651vw] h-[60px] lg:w-[406.9px] lg:h-[100px] items-center">
        <Image
          src="/dxberience_logo.svg"
          alt="Dxberience Logo"
          fill
          className="object-cover"
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
          <CustomButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
