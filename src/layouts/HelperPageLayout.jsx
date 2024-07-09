import Navbar from "@/components/Navbar";
import Footer from "@/components/shared/Footer";
import React from "react";

const HelperLayout = ({
  children,
  backgroundImage = "/wide_ocean.jpeg",
  className = "",
  overlay = false,
}) => {
  return (
    <>
      <div
        className={`relative bg-cover bg-center w-full z-2 h-[100vh] lg:h-[130vh] ${className}`}
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        {overlay && (
          <div
            className={`absolute bg-black z-1 w-full h-full`}
            style={{ opacity: overlay }}
          />
        )}
        <Navbar />
        <div className={`w-full `}>{children}</div>
      </div>
      <Footer />
    </>
  );
};

export default HelperLayout;
