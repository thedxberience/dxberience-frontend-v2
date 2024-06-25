import "./globals.css";

import localFont from "next/font/local";

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

export const metadata = {
  title: "Luxury Lifestyle Concierge Services Dubai | Dxberience",
  description:
    "We offer luxury concierge services in Dubai, redefining excellence with bespoke offerings tailored to each client's unique needs and desires.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${IvyPresto.variable} ${noah.variable} font-noah`}>
        {children}
      </body>
    </html>
  );
}
