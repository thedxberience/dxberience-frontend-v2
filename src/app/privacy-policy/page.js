import LegalPageLayout from "@/layouts/LegalPage";
import React from "react";

export const metadata = {
  title: "Privacy Policy ",
  description:
    "Learn about Dxberience's commitment to protecting your privacy and personal information with our comprehensive privacy policy.",
  alternates: {
    canonical: "https://www.thedxberience.com/privacy-policy",
  },
};

const page = () => {
  return (
    <LegalPageLayout pageName={"Privacy Policy"} lastUpdated={"1st July 2024"}>
      <p>Privacy Policy</p>
    </LegalPageLayout>
  );
};

export default page;
