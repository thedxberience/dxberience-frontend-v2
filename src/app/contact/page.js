"use client";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/Navbar";
// import FormInput from "@/components/shared/FormInput";
import CustomButton from "@/components/shared/CustomButton";
// import {
//   validateFullName,
//   validateCompany,
//   validateEmailAddress,
//   validateMessage,
//   validatePhoneNumber,
// } from "@/utils/validator";
const page = () => {
  return (
    <div className="relative">
      <Navbar />
      <div className="absolute top-0 bg-[url('/wide_ocean.jpeg')] bg-[center_top_-300px] bg-cover w-full h-full max-h-[1554px] -z-20" />
      <section className="contact-form w-full h-[100vh] flex justify-center">
        <div className="bg-gradient-to-br from-[#001618db] to-[#00161800] w-[350px] h-max min-h-[618px] flex flex-col items-center py-[40px] px-[20px] gap-4 text-white lg:max-w-[30%] 2xl:w-auto 2xl:max-h-[768px] 2xl:px-[40px]">
          <h1 className="font-IvyPresto font-semibold text-xl 2xl:text-6xl">
            Get In Touch
          </h1>
          <p className="text-sm font-extralight text-center whitespace-pre-line leading-5 2xl:pt-5 2xl:text-center 2xl:whitespace-normal">
            {`Have questions or want to create a tailored experience?
            At Dxberience, we specialize in crafting personalized services to meet your unique needs. Whether youre
            looking for bespoke travel plans, exclusive event access, or organizing private celebrations, fill out
            the form below, and let us create an experience just for you.`}
          </p>
          <form className="flex flex-col items-center w-full">
            <div className="flex flex-col gap-2 w-full min-h-[238px] 2xl:gap-10">
              {/* <FormInput name="Full Name" validator={validateFullName} />
              <FormInput
                name="Email Address"
                validator={validateEmailAddress}
              />
              <FormInput name="Phone Number" validator={validatePhoneNumber} />
              <FormInput name="Company" validator={validateCompany} />
              <FormInput name="Message" validator={validateMessage} /> */}
            </div>
            <div className="my-5">
              <CustomButton btnName="Send Message" />
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default page;
