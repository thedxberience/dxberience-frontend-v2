import Navbar from "@/components/Navbar";
import Footer from "@/components/shared/Footer";
import React from "react";

const HelperLayout = ({
  children,
  backgroundImage = "/wide_ocean.jpeg",
  className,
}) => {
  return (
    <div
      className={`bg-[center_top_-300px] bg-cover w-full h-full max-h-[1554px] -z-20 ${className}`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default HelperLayout;
