"use client";
import React, { useCallback, useEffect, useState } from "react";
import FormInput from "../shared/FormInput";
import { useForm } from "react-hook-form";
import CustomButton from "../shared/CustomButton";
import { useUserStore } from "@/store/userStore";
import { useMutation } from "@tanstack/react-query";
import { makeRequest } from "@/utils/axios";

const ProfileForm = () => {
  const user = useUserStore((state) => state.user);

  const [showStatus, setShowStatus] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      phone_number: "",
      country: "",
      password: "",
      email_marketing: true,
    },
  });

  const formValue = watch();

  const handleFormUpdate = useCallback(() => {
    if (user && formValue) {
      for (const [key, value] of Object.entries(user)) {
        if (formValue.hasOwnProperty(key)) {
          setValue(key, value, { shouldValidate: true });
        }
      }
    }
  }, [user, formValue]);

  useEffect(() => {
    handleFormUpdate();
  }, []);

  const { mutateAsync, isError, isSuccess, isPending } = useMutation({
    mutationKey: ["update-user", formValue.email],
    mutationFn: async (data) => {
      const updateUserReq = await makeRequest("/user", {
        method: "PATCH",
        data: data,
      });

      return updateUserReq;
    },
  });

  const handleUpdateUser = async (data) => {
    await mutateAsync(data);
  };

  return (
    <div className="w-full flex-center">
      <form
        className="w-11/12 lg:w-4/12 flex-center-col gap-8"
        onSubmit={handleSubmit(handleUpdateUser)}
      >
        <FormInput
          invertText
          register={register}
          errors={errors}
          name="firstName"
          placeholder={"First Name"}
          value={formValue.firstName}
        />
        <FormInput
          invertText
          register={register}
          errors={errors}
          name="lastName"
          placeholder={"Last Name"}
          value={formValue.lastName}
        />
        <FormInput
          invertText
          register={register}
          errors={errors}
          name="email"
          placeholder={"Email"}
          value={formValue.email}
        />
        <FormInput
          invertText
          register={register}
          errors={errors}
          name="country"
          placeholder={"Country"}
          value={formValue.country}
        />
        <FormInput
          invertText
          register={register}
          inputType="optin"
          errors={errors}
          setValue={setValue}
          name="email_marketing"
          value={formValue.email_marketing}
        />

        <CustomButton btnName="save" isPending={isPending} invert />
      </form>
    </div>
  );
};

export default ProfileForm;
