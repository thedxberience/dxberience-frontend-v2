// "use client";
import React, { useEffect } from "react";
import FormInput from "../shared/FormInput";
import { useForm } from "react-hook-form";
import CustomButton from "../shared/CustomButton";
import { useUserStore } from "@/store/userStore";

const ProfileForm = () => {
  const user = useUserStore((state) => state.user);

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

  useEffect(() => {
    if (user) {
      for (const [key, value] of Object.entries(user)) {
        if (formValue[key]) {
          setValue(key, value, { shouldValidate: true });
        }
      }
    }
  }, [user]);

  return (
    <div className="w-full flex-center">
      <form className="w-11/12 lg:w-4/12 flex-center-col gap-8">
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
          name="password"
          placeholder={"Password"}
          value={formValue.password}
        />
        <FormInput
          invertText
          register={register}
          errors={errors}
          name="phone_number"
          placeholder={"Phone number"}
          value={formValue.phone_number}
        />
        <FormInput
          invertText
          register={register}
          errors={errors}
          name="country"
          placeholder={"Phone number"}
          value={formValue.country}
        />
        <FormInput
          invertText
          register={register}
          type="optin"
          errors={errors}
          name="email_marketing"
          placeholder={"Email Marketing"}
          value={formValue.email_marketing}
        />

        <CustomButton btnName="save" invert />
      </form>
    </div>
  );
};

export default ProfileForm;
