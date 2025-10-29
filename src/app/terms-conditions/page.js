import LegalPageLayout from "@/layouts/LegalPage";
import React from "react";

export const metadata = {
  title: "Terms & Conditions",
  description:
    "Explore the terms and conditions governing your use of Dxberience's luxury services and experiences.",
  alternates: {
    canonical: "https://www.thedxberience.com/terms-conditions",
  },
};

const page = () => {
  return (
    <LegalPageLayout
      pageName={"Terms & Conditions"}
      lastUpdated={"1st July 2024"}
    >
      <p>Terms and Conditions</p>
    </LegalPageLayout>
  );
};

export default page;
