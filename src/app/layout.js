import "./globals.css";
import "./css/base.css";
import "./css/embla.css";

import localFont from "next/font/local";
import Provider from "@/utils/Provider";

const IvyPresto = localFont({
  src: "../../public/font/Ivy Presto/Ivy Presto 3.otf",
  display: "swap",
  variable: "--font-ivy-presto",
});

const noah = localFont({
  src: "../../public/font/Noah/Noah Regular.otf",
  display: "swap",
  variable: "--font-noah",
});

const Sacramento = localFont({
  src: "../../public/font/Sacramento/Sacramento-Regular.ttf",
  display: "swap",
  variable: "--font-sacramento",
});

export const metadata = {
  title: {
    template: "%s | Dxberience",
    default: "Luxury Lifestyle Management Services Dubai | Dxberience",
  },
  description:
    "We offer luxury lifestyle management services in Dubai, redefining excellence with bespoke offerings tailored to each client's unique needs and desires.",
  image: "/dxberience_logo.png",
  url: "https://thedxberience.com",
  twitter: {
    site: "@thedxberience",
    card: "summary_large_image",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    site_name: "Dxberience",
    title: "Luxury Lifestyle Management Services Dubai | Dxberience",
    description:
      "We offer luxury lifestyle management services in Dubai, redefining excellence with bespoke offerings tailored to each client's unique needs and desires.",
    image: "/dxberience_logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${IvyPresto.variable} ${noah.variable} ${Sacramento.variable} font-noah relative`}
      >
        <Provider>{children}</Provider>
        <div
          id="g_id_onload"
          data-client_id={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
          data-ux_mode="redirect"
          data-auto_prompt="false"
          data-context="use"
          data-itp_support="true"
          data-login_uri={process.env.NEXT_PUBLIC_API_BASE_URL + "/auth/login"}
        ></div>
      </body>
    </html>
  );
}
