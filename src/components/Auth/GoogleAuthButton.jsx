import Image from "next/image";
import React from "react";

const GoogleAuthButton = () => {
  return (
    <div>
      <div
        id="g_id_onload"
        data-client_id="600357945990-0sp7q6h5rbnqelpuci1u0len3hvhvk95.apps.googleusercontent.com"
        data-ux_mode="redirect"
        data-auto_prompt="true"
        data-context="use"
        data-itp_support="true"
        data-login_uri="https://dxberienceapi.up.railway.app/api/v1/auth/login"
        // data-login_uri="http://localhost:3000/api/v1/login"
      ></div>
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
          className="absolute w-full h-full g_id_signin opacity-0"
          data-type="standard"
        ></div>
      </button>
    </div>
  );
};

export default GoogleAuthButton;
