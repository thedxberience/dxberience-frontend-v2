import Image from "next/image";
import React, { useEffect } from "react";

const GoogleAuthButton = () => {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <button className="relative flex items-center justify-center gap-3 bg-white border w-full border-gray-300 rounded-sm text-gray-700 font-medium text-sm px-4 py-2 ">
        <Image
          src="/google_icon.png"
          alt="Google Icon"
          width={24}
          height={24}
        />
        Continue with Google
        <div
          id="google_button"
          className="absolute w-full h-full g_id_signin opacity-0 flex-center"
          data-type="standard"
          data-width="300"
        ></div>
      </button>
    </div>
  );
};

export default GoogleAuthButton;
