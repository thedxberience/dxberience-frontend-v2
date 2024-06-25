import React from "react";
import Image from "next/image";
import BrandLogo from "./BrandLogo";

const Footer = () => {
  return (
    <footer className="w-full flex flex-col gap-4 lg:gap-6 justify-center items-center bg-primary mt-[128px]">
      <BrandLogo />
      <div className="footer-items w-full flex justify-between items-center">
        <div className="w-full">
          <h1 className="text-xl w-full lg:text-4xl text-center text-white font-cormorant">
            Find Your Adventure
          </h1>
        </div>
      </div>
      <div className="contact-details flex justify-evenly border-white border-y py-4 lg:py-6 items-center w-full">
        <div className="flex flex-col w-6/12 gap-5 justify-center items-center">
          <h1 className="font-medium text-white">CALL US</h1>
          <p className="text-white text-sm md:text-base font-cormorant lg:text-4xl font-medium">
            <a href="tel:+971585023479" target="_blank">
              +971 58 502 3479
            </a>
          </p>
        </div>
        <div className="h-[100.01px] w-0 border border-white lg:rotate-0"></div>
        <div className="flex flex-col w-6/12 gap-5 justify-center items-center">
          <h1 className="font-medium text-white">EMAIL US</h1>
          <p className="text-white text-sm md:text-base font-cormorant lg:text-4xl font-medium">
            <a href="mailto:contact@thedxberience.com" target="_blank">
              Contact@thedxberience.com
            </a>
          </p>
        </div>
      </div>
      <div className="social-media flex justify-center items-center gap-4">
        {/* <a href="">
          <Image
            src="/facebook.svg"
            alt="facebook"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        </a> */}
        <a
          href="https://www.instagram.com/thedxberience?igsh=MzRlODBiNWFlZA=="
          target="_blank"
        >
          <Image
            src="/instagram.svg"
            alt="instagram"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        </a>
        {/* <a href="">
          <Image
            src="/youtube.svg"
            alt="twitter"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        </a> */}
        {/* <a href="">
          <Image
            src="/twitter.svg"
            alt="twitter"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        </a> */}

        <a href="https://www.linkedin.com/company/thedxberience/">
          <Image
            src="/linkedin.svg"
            alt="linkedin"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        </a>
      </div>
      <div className="footer-bottom w-full flex justify-center items-center gap-8 pb-8">
        <p className="text-white font-poppins text-base font-normal">
          © 2024 DXberience. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
