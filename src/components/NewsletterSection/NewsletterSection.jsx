"use client";
import React, { useEffect, useState } from "react";
import FormInput from "../shared/FormInput";
import { useForm } from "react-hook-form";
import CustomButton from "../shared/CustomButton";
import CountrySelector from "./CountrySelect";
import { useMutation } from "@tanstack/react-query";
import { makeRequest } from "@/utils/axios";

const NewsletterSection = () => {
  const [country, setCountry] = useState("");
  const [showStatus, setShowStatus] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      country: "",
      email: "",
    },
  });

  const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
    mutationKey: ["subscribe-to-newsletter"],
    mutationFn: async (data) => {
      const request = await makeRequest("/create-contact", {
        method: "POST",
        data: data,
      });
      // console.log(request);
      setShowStatus(true);
      return request;
    },
  });

  const watchAllFields = watch();

  const handleSubscribeToNewsletter = async (subscriberData) => {
    try {
      const payload = {
        email: subscriberData.email,
        emailBlacklisted: false,
        smsBlacklisted: false,
        updateEnabled: false,
        listIds: [1, 2],
        attributes: {
          firstName: subscriberData.firstName,
          lastName: subscriberData.lastName,
          country: country,
        },
      };

      mutateAsync(payload);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSuccess || isError) {
      setTimeout(() => {
        setShowStatus(false);
      }, [5000]);
    }
  }, [isSuccess, isError]);

  return (
    <section className="w-full text-white bg-primary flex justify-center items-center py-32">
      <div className="w-[88.348vw] flex flex-col justify-center items-center gap-16">
        <div className="w-full">
          <h2 className="text-2xl lg:text-4xl">OUR</h2>
          <h1 className="font-IvyPresto text-4xl lg:text-7xl">Newsletter</h1>
        </div>

        <div className="w-full">
          {showStatus && isSuccess && (
            <span className="text-green-500">
              Thank you for subscribing to our newsletter!
            </span>
          )}

          {showStatus && isError && (
            <span className="text-red-500">{error.message}</span>
          )}

          <form onSubmit={handleSubmit(handleSubscribeToNewsletter)}>
            <div className="flex flex-col lg:flex-row justify-between items-start gap-10 pb-5">
              <div className="w-full lg:w-3/12">
                <FormInput
                  placeholder={"First Name*"}
                  register={register}
                  errors={errors}
                  name="firstName"
                  options={{
                    required: "First Name is required",
                  }}
                  value={watchAllFields.firstName}
                />
              </div>
              <div className="w-full lg:w-3/12">
                <FormInput
                  placeholder={"Last Name*"}
                  register={register}
                  errors={errors}
                  name="lastName"
                  options={{
                    required: "Last Name is required",
                  }}
                  value={watchAllFields.lastName}
                />
              </div>
              <div className="w-full lg:w-3/12">
                <CountrySelector setCountry={setCountry} country={country} />
              </div>

              <FormInput
                placeholder={"Email Address*"}
                register={register}
                errors={errors}
                name="email"
                value={watchAllFields.email}
                options={{
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                }}
              />

              <div className="w-full flex justify-center items-center lg:w-4/12 ">
                <CustomButton btnName="Subscribe Now" isPending={isPending} />
              </div>
            </div>
          </form>
          <div className="privacy-policy text-white text-sm font-extralight pt-3">
            <p>
              By signing up to the newsletter you confirm you have read & agree
              to the <span className="font-bold">Privacy Policy.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
