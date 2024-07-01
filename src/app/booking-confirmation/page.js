import React from "react";
import HelperLayout from "@/layouts/HelperPageLayout";
import { MessageBox } from "@/components/shared/MessageBox";

function BookingConfirmationPage() {
  return (
    <HelperLayout backgroundImage="/background-jet.jpg" className={"relative"}>
      {/* <div className="absolute top-0 bg-black w-full h-full bg-opacity-70 -z-10" /> */}
      <MessageBox
        btnName="GO TO HOMEPAGE"
        className={"h-[60vh]"}
        from={"#101010"}
        to={"#10101000"}
      >
        <h1 className="text-4xl font-IvyPresto">{`Thank you,
         We have received your request.`}</h1>
        <p className="w-[219px] md:w-[582px]">
          Our team will reach out to finalize your booking and payment. We will
          customize the experience to suit your needs.
        </p>
      </MessageBox>
    </HelperLayout>
  );
}

export default BookingConfirmationPage;
