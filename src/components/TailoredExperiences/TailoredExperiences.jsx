"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import FormInput from "../shared/FormInput";
import CountrySelector from "../NewsletterSection/CountrySelect";
import CustomButton from "../shared/CustomButton";
import { useMutation } from "@tanstack/react-query";
import { makeRequest } from "@/utils/axios";
import { FormSelectTag } from "../shared/FormSelectTag";

const TailoredExperienceForm = () => {
  const [country, setCountry] = useState();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [exclusivity, setExclusivity] = useState("");
  const [contactMethod, setContactMethod] = useState("");

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      country: "",
      company: "",
      optin: true,
      message: "Hello, I'd like to request a tailored experience.",
    },
  });

  const watchAllFields = watch();

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

  const handleMakeTailoredExperienceRequest = async (contactData) => {
    try {
      const message = `
        Preferred Level Of Exclusivity: ${exclusivity}
        How would you like us to get in touch: ${contactMethod}
        Message: ${contactData.message}
      `;
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
          message: message,
          optin: contactData.optin,
        },
      };
      const response = await mutateAsync(payload);
      if (!isError) {
        setFormSubmitted(true);
        setTimeout(() => {
          setShowStatus(false);
        }, 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {showStatus && isError && <span className="text-red-300">{error}</span>}
      {showStatus && formSubmitted && (
        <span className="text-green-500">
          We have received your request! Someone from the team should reach out
          to you soon!
        </span>
      )}
      <form
        className="flex justify-center items-center gap-10 flex-col w-full"
        onSubmit={handleSubmit(handleMakeTailoredExperienceRequest)}
      >
        <div className="flex justify-center items-center gap-10 flex-col lg:flex-row w-full">
          <FormInput
            className="w-full"
            errors={errors}
            register={register}
            placeholder={"First Name *"}
            value={watchAllFields.firstName}
            name="firstName"
          />
          <FormInput
            className="w-full"
            errors={errors}
            register={register}
            placeholder={"Last Name *"}
            value={watchAllFields.lastName}
            name="lastName"
          />
        </div>
        <div className="flex justify-center items-center gap-10 flex-col lg:flex-row w-full">
          <FormInput
            className="w-full"
            errors={errors}
            register={register}
            placeholder={"Email Address *"}
            value={watchAllFields.email}
            name="email"
          />
          <FormInput
            className="w-full"
            errors={errors}
            register={register}
            placeholder={"Phone Number *"}
            value={watchAllFields.phoneNumber}
            name="phoneNumber"
          />
        </div>
        <div className="flex justify-center items-center gap-10 flex-col lg:flex-row w-full">
          <div className="w-full">
            <CountrySelector country={country} setCountry={setCountry} invert />
          </div>
          <FormInput
            className="w-full"
            errors={errors}
            register={register}
            placeholder={"Company"}
            value={watchAllFields.company}
            name="company"
          />
        </div>
        <div className="flex justify-center items-center gap-10 flex-col lg:flex-row w-full">
          <FormSelectTag
            label={"Preferred level of exclusivity"}
            options={["Private", "Semi-Private"]}
            setSelectValue={setExclusivity}
            selectValue={exclusivity}
            invert
          />
          <FormSelectTag
            label={"How would you like us to get in touch?"}
            options={["Email", "Phone", "WhatsApp"]}
            setSelectValue={setContactMethod}
            selectValue={contactMethod}
            invert
          />
        </div>
        <div className="w-full">
          <FormInput
            errors={errors}
            placeholder={"Message *"}
            register={register}
            inputType="textarea"
            value={watchAllFields.message}
            name="message"
          />
          <p className="text-white text-sm font-extralight">
            Fill out the form above, and let us create an experience just for
            you.
          </p>
        </div>
        <div className="mt-2 w-full">
          <FormInput
            inputType="optin"
            value={watchAllFields.optin}
            setValue={setValue}
            errors={errors}
            name="optin"
            register={register}
          />
        </div>
        <div className="w-full flex justify-start items-start">
          <CustomButton btnName="Enquire Now" isPending={isPending} />
        </div>
      </form>
    </>
  );
};

export default TailoredExperienceForm;
