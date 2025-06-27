/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
    ],
  },
  async redirects() {
    return [
      // VIP Concierge
      {
        source: "/categories/vip-concierge",
        destination: "/explore-experiences/vip-concierge/",
        permanent: true,
      },
      {
        source: "/events/personal-shopping-with-fashion-consultant",
        destination:
          "/explore-experiences/vip-concierge/personal-shopping-with-fashion-consultant",
        permanent: true,
      },

      // Luxury Car Rentals
      {
        source: "/categories/luxury-car-rentals",
        destination: "/explore-experiences/luxury-car-rentals/",
        permanent: true,
      },
      ...[
        "exclusive-aston-martin-db11-experience",
        "mercedes-benz-gle63s",
        "bmw-m4-competition",
        "mercedes-brabus-g63-700-widestar",
        "bmw-735i-2023",
        "bmw-x7m-sports",
        "bentley-continental-gt",
        "bentley-bentayga-2020",
        "chauffeur-driven-maybach-gls600",
        "ferrari-488-spyder",
        "chauffeur-driven-bentley-bentayga-experience",
        "lamborghini-huracan-evo-spider-2023",
        "ferrari-488-spyder-or-white",
        "audi-r8-spyder-2020",
        "bmw-x6-m-competition-2022",
        "chauffeur-driven-bmw-x7-m50i-experience",
        "cadillac-escalade-sports-platinum",
        "desert-supercar-adventure",
        "rolls-royce-wraith-black-badge",
        "chauffeur-driven-rolls-royce-cullinan",
        "chauffeur-driven-range-rover-svr",
        "bentley-continental-gtc",
        "audi-rs3-2022",
        "mclaren-720s-novitec-spider-2023",
        "chauffeur-driven-gmc-yukon-denali",
        "chauffeur-driven-cadillac-esclade",
      ].map((slug) => ({
        source: `/events/${slug}`,
        destination: `/explore-experiences/luxury-car-rentals/${slug}`,
        permanent: true,
      })),

      // Luxury Yacht Rentals
      {
        source: "/categories/luxury-yacht-rentals",
        destination: "/explore-experiences/luxury-yacht-rentals/",
        permanent: true,
      },
      ...[
        "nz-custom-164ft-or-jacuzzi",
        "baglietto-108ft",
        "von-dutch-48ft",
        "benetti-164ft-luxury-yacht-with-jacuzzi",
        "riva-100ft-luxury-yacht-with-jacuzzi",
        "nuvari-68ft",
        "dolce-vita-110ft",
        "hessen-154ft-with-jacuzzi",
      ].map((slug) => ({
        source: `/events/${slug}`,
        destination: `/explore-experiences/luxury-yacht-rentals/${slug}`,
        permanent: true,
      })),

      // Events
      {
        source: "/categories/events",
        destination: "/explore-experiences/",
        permanent: true,
      },
      {
        source: "/events/abu-dhabi-grand-prix-formula-1",
        destination:
          "/explore-experiences/events/abu-dhabi-grand-prix-formula-1",
        permanent: true,
      },

      // Restaurants and Nightlife
      {
        source: "/categories/restaurants-and-nightlife",
        destination: "/explore-experiences/restaurants-and-nightlife/",
        permanent: true,
      },
      {
        source: "/events/restaurants-and-nightlife",
        destination:
          "/explore-experiences/restaurants-and-nightlife/restaurants",
        permanent: true,
      },

      // Luxury Stays
      {
        source: "/categories/luxury-stays",
        destination: "/explore-experiences/luxury-stays/",
        permanent: true,
      },
      ...[
        "stunning-3-bedroom-apartment-with-skyline-views-or-downtown",
        "stunning-2-bedroom-in-city-walk-or-courtyard-view",
        "high-floor-2-bedroom-with-bay-view",
        "chic-2-bedroom-with-harbor-view-in-dubai-harbour",
        "chic-1-bedroom-with-water-views-in-la-mer",
        "spirit-of-son-fuster-or-10-bedroom-villa",
        "isla-sa-ferradura-6-bedroom-villa",
        "the-great-house-12-bedroom-villa",
        "villa-sola-cabiati-6-bedroom-mansion",
        "luxury-3-bedroom-next-to-dubai-mall-or-panoramic-downtown-views",
        "classy-2-bedroom-with-skyline-view-in-dubai-marina",
        "classy-1-bedroom-with-water-views-in-la-mer-or-la-rive-building-2",
        "dimora-ghirlandaio-20-bedroom-villa",
        "casa-koko-9-bedroom-luxury-villa",
        "erosantorini-villa",
        "stylish-2-bedroom-in-city-walk-or-building",
        "2-bedroom-apartment-with-city-skyline-view-or-downtown",
        "lavish-2-bedroom-with-pool",
        "villa-mallorca-or-palm-jumeirah-9-bedroom-villa",
        "villa-avellana-10-bedroom-luxury-villa",
        "keythorpe-hall-or-20-bedroom-manor",
      ].map((slug) => ({
        source: `/events/${slug}`,
        destination: `/explore-experiences/luxury-stays/${slug}`,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
