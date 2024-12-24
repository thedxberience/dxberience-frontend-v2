"use client";
import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import CustomButton from "../shared/CustomButton";
import FormInput from "../shared/FormInput";
import CountrySelector from "../NewsletterSection/CountrySelect";
import { makeRequest } from "@/utils/axios";

const ContactForm = () => {
  const [country, setCountry] = useState("");
  const [showStatus, setShowStatus] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      company: "",
      agreePrivacyPolicy: true,
      optin: true,
      message: "",
    },
  });

  const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
    mutationKey: ["contact-us"],
    mutationFn: async (data) => {
      const request = await makeRequest("/create-contact", {
        method: "POST",
        data: data,
      });
      setShowStatus(true);
      return request;
    },
  });

  const watchAllFields = watch();
  const handleContactUs = async (contactData) => {
    try {
      const payload = {
        email: contactData.email,
        emailBlacklisted: false,
        smsBlacklisted: false,
        updateEnabled: false,
        listIds: [1, 2],
        attributes: {
          firstName: contactData.firstName,
          lastName: contactData.lastName,
          country: country,
          company: contactData.company,
          phoneNumber: contactData.phoneNumber,
          message: "Partner Form: " + contactData.message,
          optin: contactData.optin,
        },
      };
      const response = await mutateAsync(payload);
      if (isSuccess) {
        setFormSubmitted(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let timeout;
    if (isError) {
      timeout = setTimeout(() => {
        setShowStatus(false);
      }, [5000]);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [isError]);

  return (
    <section className="w-full h-full flex justify-center py-10">
      {!formSubmitted ? (
        <div className="bg-gradient-to-br bg-[#FFFFFFB2] w-[350px] flex flex-col items-center py-[40px] px-[20px] gap-4 text-black lg:w-[450px] 2xl:w-[681px] 2xl:px-[40px]">
          <h1 className="font-IvyPresto font-semibold text-xl xl:text-3xl 2xl:text-6xl">
            Join us Today
          </h1>
          <p className="text-sm font-extralight text-center leading-5 2xl:pt-5 2xl:text-center">
            Have questions or want to create a tailored experience? At
            Dxberience, we specialize in crafting personalized services to meet
            your unique needs. Whether youre looking for bespoke travel plans,
            exclusive event access, or organizing private celebrations, fill out
            the form below, and let us create an experience just for you.
          </p>
          {showStatus && isError && (
            <span className="text-red-300">{error}</span>
          )}
          <form
            className="flex flex-col items-center w-full"
            onSubmit={handleSubmit(handleContactUs)}
          >
            <div className="hide-scrollbar overflow-auto h-[750px] max-h-[800px] partner-form flex flex-col gap-10 w-full min-h-[238px] 2xl:gap-10 text-black border-black">
              <FormInput
                invertText
                name="firstName"
                placeholder={"First Name"}
                register={register}
                errors={errors}
                value={watchAllFields.firstName}
                options={{
                  required: "First Name is required",
                  pattern: /^[a-zA-Z\s-]{2,}$/,
                }}
              />
              <FormInput
                invertText
                name="lastName"
                placeholder={"Last Name"}
                register={register}
                errors={errors}
                value={watchAllFields.lastName}
                options={{
                  required: "Last Name is required",
                  pattern: /^[a-zA-Z\s-]{2,}$/,
                }}
              />
              <FormInput
                invertText
                name="email"
                placeholder={"Email"}
                register={register}
                errors={errors}
                value={watchAllFields.email}
                options={{
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                }}
              />
              <FormInput
                invertText
                name="phoneNumber"
                placeholder={"Phone Number"}
                register={register}
                errors={errors}
                value={watchAllFields.phoneNumber}
                options={{
                  required: "Phone number is required",
                  pattern: {
                    value:
                      /^(\+?\d{1,4}[-.\s]?)?(\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})$/,
                    message: "Invalid phone number",
                  },
                }}
              />
              <CountrySelector country={country} setCountry={setCountry} />
              <FormInput
                invertText
                name="company"
                placeholder={"Company"}
                register={register}
                errors={errors}
                value={watchAllFields.company}
              />
              <FormInput
                invertText
                name="message"
                inputType="textarea"
                placeholder={"Message"}
                register={register}
                errors={errors}
                value={watchAllFields.message}
              />

              <div className="mt-2 flex-start flex-col w-full gap-2">
                <FormInput
                  invertText
                  inputType="optin"
                  placeholder={"I agree to DXBerience Privacy & Terms *"}
                  value={watchAllFields.agreePrivacyPolicy}
                  setValue={setValue}
                  errors={errors}
                  name="agreePrivacyPolicy"
                  options={{
                    required: "You need to agree to Privacy Policy",
                  }}
                  register={register}
                />
                <FormInput
                  invertText
                  inputType="optin"
                  placeholder={
                    "I would like to be kept up to date with the latest news via email"
                  }
                  value={watchAllFields.optin}
                  setValue={setValue}
                  errors={errors}
                  name="optin"
                  register={register}
                />
              </div>
              <div className="flex mt-3 justify-center">
                <CustomButton btnName="Send Message" isPending={isPending} />
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div
          className={`relative message-box flex flex-col items-center justify-center mt-11 mx-auto py-10 px-14 gap-5 w-[350px] bg-gradient-to-br bg-[#FFFFFFB2] lg:w-[500px] 2xl:w-[840px]`}
        >
          <div className="flex flex-col gap-5 text-center text-black ">
            <h1 className="text-xl font-IvyPresto lg:text-3xl 2xl:text-5xl 2xl:leading-[65px]">
              Thank you.
              <br />
              We've received your request.
            </h1>

            <p className="text-sm 2xl:text-xl">
              Our team will contact you to address your request.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default ContactForm;
