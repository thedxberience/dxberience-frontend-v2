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
        className={`relative bg-cover bg-center w-full z-2 min-h-fit ${className}`}
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        {overlay && (
          <div
            className={`absolute bg-black w-full h-full`}
            style={{ opacity: overlay }}
          />
        )}
        <div className="flex flex-col justify-between items-center h-full gap-12">
          <Navbar />
          <div className={`w-full `}>{children}</div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default HelperLayout;
