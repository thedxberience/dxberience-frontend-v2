import React from "react";
import HelperLayout from "@/layouts/HelperPageLayout";
import CustomButton from "@/components/shared/CustomButton";
import { getGradient } from "@/utils/utils";
function BookingConfirmationPage() {
  return (
    <HelperLayout
      backgroundImage="/background-jet.jpg"
      className={"h-[55vh] lg:h-[70vh]"}
      overlay={"70%"}
    >
      <div
        className={`relative message-box flex flex-col items-center justify-center mt-11 mx-auto py-10 px-14 gap-5 w-[350px] bg-gradient-to-br from-[#101010] to-[#10101000] lg:w-[840px]`}
      >
        <div className="flex flex-col gap-5 text-center text-white ">
          <h1 className="text-xl font-IvyPresto lg:text-5xl lg:leading-[65px]">
            Thank you.
            <br />
            We've received your request.
          </h1>

          <p className="text-sm lg:text-xl">
            Our team will reach out to finalize your booking and payment. We
            will customize the experience to suit your needs.
          </p>
        </div>
        <CustomButton btnName="go to homepage" />
      </div>
    </HelperLayout>
  );
}

export default BookingConfirmationPage;

{
  /* <div className="flex justify-center p-32 text-white">
        <GradientBox className="mt-[42px]">
          <h1 className="text-2xl font-IvyPresto text-center md:whitespace-pre md:text-4xl">{`Thank you,
         We have received your request.`}</h1>
          <p className="text-base w-[219px] md:w-[582px] text-center md:text-lg">
            Our team will reach out to finalize your booking and payment. We
            will customize the experience to suit your needs.
          </p>
          <CustomButton btnName="GO TO HOMEPAGE" />
        </GradientBox>
      </div> */
}
