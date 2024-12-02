import Footer from "@/components/shared/Footer";
import LegalPageLayout from "@/layouts/LegalPage";
import React from "react";

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
