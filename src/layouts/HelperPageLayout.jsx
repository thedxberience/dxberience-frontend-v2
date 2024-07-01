import Navbar from "@/components/Navbar";
import Footer from "@/components/shared/Footer";
import React from "react";

const HelperLayout = ({ children, backgroundImage = "/wide_ocean.jpeg" }) => {
  return (
    <div
      className={`bg-cover bg-center w-full -z-20`}
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <Navbar />
      <div className="w-full min-h-[792px] lg:min-h-[1554px]">{children}</div>
      <Footer />
    </div>
  );
};

export default HelperLayout;
