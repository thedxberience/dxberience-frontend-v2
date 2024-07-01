import React from "react";
import HelperLayout from "@/layouts/HelperPageLayout";
import { GradientBox } from "@/components/shared/GradientBox";
import CustomButton from "@/components/shared/CustomButton";
function BookingConfirmationPage() {
  return (
    <HelperLayout
      backgroundImage="/background-jet.jpg"
      className={"relative bg-opacity-70"}
    >
      <div className="flex justify-center p-32 text-white">
        <GradientBox
          from="#101010"
          to="#1010105d"
          gradientOn
          className="to-[#101010c7]"
        >
          <h1 className="text-2xl font-IvyPresto text-center md:whitespace-pre md:text-4xl">{`Thank you,
         We have received your request.`}</h1>
          <p className="text-base w-[219px] md:w-[582px] text-center md:text-lg">
            Our team will reach out to finalize your booking and payment. We
            will customize the experience to suit your needs.
          </p>
          <CustomButton btnName="GO TO HOMEPAGE" />
        </GradientBox>
      </div>
    </HelperLayout>
  );
}

export default BookingConfirmationPage;
