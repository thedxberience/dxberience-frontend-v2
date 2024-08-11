import React from "react";
import HelperLayout from "@/layouts/HelperPageLayout";
import CustomButton from "@/components/shared/CustomButton";

export const metadata = {
  title: "Thank you for your request",
  description:
    "Our team at Dxberience will reach out to finalize your booking and payment. We will customize the experience to suit your needs.",
};

function BookingConfirmationPage() {
  return (
    <HelperLayout
      backgroundImage="/background-jet.jpg"
      className={"lg:h-[100vh]"}
      overlay={"70%"}
    >
      <div
        className={`relative message-box flex flex-col items-center justify-center mt-11 mx-auto py-10 px-14 gap-5 w-[350px] bg-gradient-to-br from-[#101010] to-[#10101000] lg:w-[500px] 2xl:w-[840px]`}
      >
        <div className="flex flex-col gap-5 text-center text-white ">
          <h1 className="text-xl font-IvyPresto lg:text-3xl 2xl:text-5xl 2xl:leading-[65px]">
            Thank you,
            <br />
            We've received your request!
          </h1>

          <p className="text-sm 2xl:text-xl">
            Our team will reach out to finalize your booking and payment. We
            will customize the experience to suit your needs.
          </p>
        </div>
        <CustomButton btnName="go to homepage" isLink href="/" />
      </div>
    </HelperLayout>
  );
}

export default BookingConfirmationPage;
