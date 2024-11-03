import Image from "next/image";
import React from "react";

const LoadingIcon = () => {
  return (
    <div>
      <Image
        src="/Loader.svg"
        alt="loader spinner"
        className="animate-spin"
        width={48}
        height={48}
      />
    </div>
  );
};

export default LoadingIcon;
