import { NextResponse } from "next/server";

export const config = {
  matcher: [
    "/",
    "/explore-experiences/(.*)",
    "/events/(.*)",
    "/about",
    "/contact",
    "/partners",
    "/tailored-experiences",
    "/party-finder",
  ],
};

export default function middleware(req) {
  const { nextUrl } = req;

  // check for referral code in the url
  const params = nextUrl.searchParams;
  const referralCode = params.get("referral");
  console.log("Middleware triggered for:", nextUrl.pathname);
  console.log("referralCode", referralCode);

  if (referralCode) {
    // Create response and set cookie properly
    const response = NextResponse.next();

    // Set the referral code cookie with expiration (1 day)
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day from now

    response.cookies.set("referral", referralCode, {
      expires: expires,
      httpOnly: false, // Allow client-side access if needed
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    console.log("Set referral cookie:", referralCode, "expires:", expires);
    return response;
  }

  return NextResponse.next();
}
