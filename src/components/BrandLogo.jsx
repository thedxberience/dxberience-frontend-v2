import React from "react";
import Image from "next/image";

const BrandLogo = ({ logoType = "light" }) => {
  return (
    <div className="logo relative w-[30.467vw] h-16 mt-5 ">
      {logoType == "light" ? (
        <Image src="/dxberience_logo.svg" alt="logo" fill />
      ) : (
        <Image src="/dxberience_logo_black.svg" alt="logo" fill />
      )}
    </div>
  );
};

export default BrandLogo;
