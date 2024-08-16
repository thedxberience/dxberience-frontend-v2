"use client";

function Login() {
  return (
    <div>
      {/* <div
        id="g_id_onload"
        data-client_id="1012324152547-6hvmdkhhc2fraebgjkp8d8os1o13n18e.apps.googleusercontent.com"
        data-callback="handleCredentialResponse"
      ></div>
      <div className="g_id_signin" data-type="standard"></div> */}
      <div
        id="g_id_onload"
        data-client_id="1012324152547-6hvmdkhhc2fraebgjkp8d8os1o13n18e.apps.googleusercontent.com"
        data-ux_mode="redirect"
        data-itp_support="true"
        // data-login_uri="https://redirectmeto.com/https://dxberienceapi.up.railway.app/api/v1/auth/login"
        //data-login_uri="https://dxberienceapi.up.railway.app/api/v1/auth/login"
        data-login_uri="http://localhost:3000/api/v1/auth/login"
      ></div>

      <div className="g_id_signin" data-type="standard"></div>
    </div>
  );
}

export default Login;
