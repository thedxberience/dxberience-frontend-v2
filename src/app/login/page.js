"use client";

function Login() {
  return (
    <div>
      <div
        id="g_id_onload"
        data-client_id="1012324152547-6hvmdkhhc2fraebgjkp8d8os1o13n18e.apps.googleusercontent.com"
        data-ux_mode="redirect"
        data-auto_prompt="true"
        data-context="use"
        data-itp_support="true"
        data-login_uri="https://dxberienceapi.up.railway.app/api/v1/auth/login"
        //data-login_uri="http://localhost:3000/api/v1/auth/login"
      ></div>
      <button className="relative flex items-center justify-center bg-white border w-[300px] border-gray-300 rounded-sm text-gray-700 font-medium text-sm px-4 py-2 ">
        Continue with Google
        <div
          id="google_button"
          className="absolute w-full h-full g_id_signin opacity-0"
          data-type="standard"
        ></div>
      </button>
    </div>
  );
}

export default Login;
