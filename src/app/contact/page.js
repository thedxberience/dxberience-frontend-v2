import ContactPage from "@/components/Pages/Contact";

export const metadata = {
  title: "Contact Dxberience - Personalized Luxury Lifestyle Services",
  description:
    "Get in touch with Dxberience to design your perfect personalized luxury experience in Dubai. From tailored travel to exclusive events — we're here to make it effortless.",
  alternates: {
    canonical: "https://www.thedxberience.com/contact",
  },
  openGraph: {
    title: "Contact Dxberience - Personalized Luxury Lifestyle Services",
    description:
      "Get in touch with Dxberience to design your perfect personalized luxury experience in Dubai. From tailored travel to exclusive events — we're here to make it effortless.",
  },
};

const page = () => {
  return <ContactPage />;
};

export default page;
