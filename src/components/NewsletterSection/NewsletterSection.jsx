"use client";
import React from "react";
import FormInput from "../shared/FormInput";
import { useForm } from "react-hook-form";
import CustomButton from "../shared/CustomButton";

const NewsletterSection = () => {
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
      email: "",
    },
  });

  const watchAllFields = watch();

  return (
    <section className="w-full text-white bg-primary flex justify-center items-center py-32">
      <div className="w-[88.348vw] flex flex-col justify-center items-center gap-16">
        <div className="w-full">
          <h2 className="text-2xl lg:text-4xl">OUR</h2>
          <h1 className="font-IvyPresto text-4xl lg:text-7xl">Newsletter</h1>
        </div>

        <div className="w-full">
          <form>
            <div className="flex flex-col lg:flex-row justify-between items-start gap-10 pb-5">
              <div className="w-full lg:w-3/12">
                <FormInput
                  placeholder={"First Name"}
                  register={register}
                  errors={errors}
                  name="firstName"
                  value={watchAllFields.firstName}
                />
              </div>
              <div className="w-full lg:w-3/12">
                <FormInput
                  placeholder={"Last Name"}
                  register={register}
                  errors={errors}
                  name="lastName"
                  value={watchAllFields.lastName}
                />
              </div>

              <FormInput
                placeholder={"Email Address"}
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
                <CustomButton btnName="Subscribe Now" />
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
