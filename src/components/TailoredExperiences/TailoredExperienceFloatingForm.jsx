"use client";
import React, { useEffect, useState } from "react";
import FormInput from "../shared/FormInput";
import { useForm } from "react-hook-form";
import CustomButton from "../shared/CustomButton";
import CountrySelector from "../NewsletterSection/CountrySelect";
import { useMutation } from "@tanstack/react-query";
import { makeRequest } from "@/utils/axios";
import CustomSelectTag from "../shared/CustomSelectTag";
import CustomOptionTag from "../shared/CustomOptionTag";
import { FormSelectTag } from "../shared/FormSelectTag";

const TailoredExperienceFloatingForm = ({ revealForm, setRevealForm }) => {
  const [country, setCountry] = useState();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [exclusivity, setExclusivity] = useState("");
  const [contactMethod, setContactMethod] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
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
      message: "Hello, I'd like to request a tailored experience.",
      optin: true,
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
        // setTimeout(() => {
        //   setRevealForm(false);
        // }, 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseForm = () => {
    setRevealForm(false);
  };

  return (
    <div className="tailored-eperiences-floating-form max-w-[98svw] h-fit md:max-w-[600px] w-full px-8 md:px-[70px] py-[68px] flex flex-col justify-center items-center gap-6">
      <>
        {formSubmitted ? (
          <div className="flex flex-col gap-6 h-screen justify-center items-center w-full text-white">
            <div className="header">
              <h1 className="text-3xl text-center font-IvyPresto">
                Thank You!
              </h1>
            </div>
            <div className="content">
              <p>
                Your journey begins here,{" "}
                <span className="font-bold">{watchAllFields.firstName}</span>.
                We’ve received your inquiry and our team is dedicated to
                curating a tailored experience just for you. Expect to hear from
                us shortly with the finest options available.
              </p>
            </div>
            <CustomButton btnName="close" onClick={handleCloseForm} />
          </div>
        ) : (
          <>
            <div className="form-header flex flex-col justify-center items-center text-white gap-6">
              <h1 className="text-white text-center font-IvyPresto text-xl lg:text-3xl">
                Experiences Tailored To You
              </h1>
              <p className="tailored-form-desc text-center">
                Have questions or want to create a tailored experience? At
                Dxberience, we specialize in crafting personalized services to
                meet your unique needs. Whether you’re looking for bespoke
                travel plans, exclusive event access, or organizing private
                celebrations, fill out the form below, and let us create an
                experience just for you.
              </p>
            </div>
            {showStatus && isError && (
              <span className="text-red-300">{error}</span>
            )}
            {showStatus && formSubmitted && (
              <span className="text-green-500">
                We have received your request! Someone from the team should
                reach out to you soon!
              </span>
            )}
            <form
              className="floating-form w-full max-h-[50svh] lg:max-h-[60svh] h-full overflow-auto"
              onSubmit={handleSubmit(handleMakeTailoredExperienceRequest)}
            >
              <div className=" flex flex-col gap-2 w-full min-h-[238px] 2xl:gap-10">
                <FormInput
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
                <CountrySelector
                  country={country}
                  setCountry={setCountry}
                  invert
                />

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
                <FormInput
                  name="company"
                  placeholder={"Company"}
                  register={register}
                  errors={errors}
                  value={watchAllFields.company}
                />
                <FormInput
                  name="message"
                  inputType="textarea"
                  placeholder={"Message"}
                  register={register}
                  errors={errors}
                  value={watchAllFields.message}
                />

                <div className="mt-2">
                  <FormInput
                    inputType="optin"
                    value={watchAllFields.optin}
                    setValue={setValue}
                    errors={errors}
                    name="optin"
                    register={register}
                  />
                </div>
                <div className="flex my-5 justify-center">
                  <CustomButton
                    btnName="Design your experience"
                    isPending={isPending}
                  />
                </div>
              </div>
            </form>
          </>
        )}
      </>
    </div>
  );
};

export default TailoredExperienceFloatingForm;
