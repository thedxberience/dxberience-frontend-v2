"use client";
import React, { useEffect, useState } from "react";
import CustomButton from "../shared/CustomButton";
import { useForm } from "react-hook-form";
import FormInput from "../shared/FormInput";
import CountrySelector from "../NewsletterSection/CountrySelect";
import CustomCheckBox from "../shared/CustomCheckBox";
import { useMutation } from "@tanstack/react-query";
import { makeRequest } from "@/utils/axios";
import { useApiStore } from "@/store/apiStore";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      country: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { registerUser, registerError, setRegisterError } = useApiStore(
    (state) => state
  );

  const [country, setCountry] = useState();

  const [agreedTerms, setAgreedTerms] = useState(false);
  const [subscribeToNewsletter, setSubscribeToNewsletter] = useState(false);
  const [showStatus, setShowStatus] = useState();
  // const [registerError, setRegisterError] = useState("");

  const watchAllFields = watch();

  const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
    mutationKey: ["register", watchAllFields.email],
    mutationFn: async (data) => {
      await registerUser(data);
    },
  });

  const handleRegister = async (data) => {
    const payload = { ...data, country: country };
    if (agreedTerms) {
      await mutateAsync(payload);
    } else {
      setRegisterError("You must agree to our privacy and terms to register");
    }
    setShowStatus(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setShowStatus(false);
      setRegisterError("");
    }, 5000);
  }, [showStatus]);

  return (
    <form
      className="flex flex-col justify-start items-start gap-10 w-full px-2 h-[50svh] overflow-auto"
      onSubmit={handleSubmit(handleRegister)}
    >
      {showStatus && registerError && (
        <p className="flex w-full justify-center items-center text-red-500">
          {registerError}
        </p>
      )}

      {showStatus && !registerError && (
        <p className="flex w-full justify-center items-center text-green-500">
          Registration Successful
        </p>
      )}

      <FormInput
        name="firstName"
        value={watchAllFields.firstName}
        placeholder={"First Name*"}
        errors={errors}
        register={register}
        invertText
      />
      <FormInput
        name="lastName"
        value={watchAllFields.lastName}
        placeholder={"Last Name*"}
        errors={errors}
        register={register}
        invertText
      />
      <div className="w-full border-b border-tab-inactive">
        <CountrySelector country={country} setCountry={setCountry} />
      </div>

      <FormInput
        name="email"
        value={watchAllFields.email}
        placeholder={"Email Address*"}
        errors={errors}
        register={register}
        invertText
      />
      <FormInput
        name="password"
        value={watchAllFields.password}
        placeholder={"Password*"}
        errors={errors}
        register={register}
        inputType="password"
        invertText
      />
      <FormInput
        name="confirmPassword"
        value={watchAllFields.confirmPassword}
        placeholder={"Confirm Password*"}
        errors={errors}
        register={register}
        inputType="password"
        options={{
          validate: (value, formValues) => value === formValues.password,
        }}
        invertText
      />
      <div className="flex flex-col justify-start items-start gap-9">
        <div className="flex justify-start items-center gap-2">
          <CustomCheckBox selected={agreedTerms} setSelected={setAgreedTerms} />
          <p>I agree to DXBerience Privacy & Terms *</p>
        </div>
        <div className="flex justify-start items-center gap-2">
          <CustomCheckBox
            selected={subscribeToNewsletter}
            setSelected={setSubscribeToNewsletter}
          />
          <p>
            I would like to be kept up to date with the latest news via email
          </p>
        </div>
      </div>
      <div className="w-full flex justify-center items-center pb-4">
        <CustomButton btnName="sign up" isPending={isPending} invert />
      </div>
    </form>
  );
};

export default RegisterForm;