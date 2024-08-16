import "./globals.css";
import "./css/base.css";
import "./css/embla.css";

import Script from "next/script";

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
  title: "Luxury Lifestyle Concierge Services Dubai | Dxberience",
  description:
    "We offer luxury concierge services in Dubai, redefining excellence with bespoke offerings tailored to each client's unique needs and desires.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${IvyPresto.variable} ${noah.variable} ${Sacramento.variable} font-noah`}
      >
        <Provider>{children}</Provider>
      </body>
      <Script src="https://accounts.google.com/gsi/client" async defer></Script>
      <Script>
        {`
          function handleCredentialResponse(response) {
            if (response.credential) {
              const credential = response.credential;
              console.log(credential);
            }
          }

           window.handleCredentialResponse = handleCredentialResponse;
        `}
      </Script>
      {/* <script src="https://accounts.google.com/gsi/client" async defer></script> */}
    </html>
  );
}
