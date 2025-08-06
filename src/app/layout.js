import "./globals.css";
import "./css/base.css";
import "./css/embla.css";

import localFont from "next/font/local";
import Provider from "@/utils/Provider";
import { GoogleTagManager } from "@next/third-parties/google";
import Script from "next/script";

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
  image: "https://thedxberience.com/dxberience_logo.png",
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
      <head>
        <meta
          name="google-site-verification"
          content="xEtWbLOZ4OIEmKGbRhGEtSRH4e80PVtRL_dc-je0nyg"
        />
        <GoogleTagManager gtmId="G-E83NFRVJPZ" />
        <Script
          async
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-E83NFRVJPZ');`,
          }}
        />
        {/* <!-- Meta Pixel Code --> */}
        <Script
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '960479412870471');
        fbq('track', 'PageView');`,
          }}
        />
        <noscript
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            <img
              height="1"
              width="1"
              style="display:none"
              src="https://www.facebook.com/tr?id=960479412870471&ev=PageView&noscript=1"
            />
            `,
          }}
        />
        {/* <!-- End Meta Pixel Code --> */}
      </head>

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
