"use client";
import CustomButton from "@/components/shared/CustomButton";
import FormInput from "@/components/shared/FormInput";
import HelperLayout from "@/layouts/HelperPageLayout";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { makeRequest } from "@/utils/axios";
import { useComponentStore } from "@/store/componentStore";
import { useUserStore } from "@/store/userStore";

const page = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const [showStatus, setShowStatus] = useState(false);
  const [resetPasswordError, setResetPasswordError] = useState("");

  const setOpenModal = useComponentStore((state) => state.setOpenModal);

  const { mutateAsync, isError, isSuccess, isPending } = useMutation({
    mutationKey: ["reset-password"],
    mutationFn: async (data) => {
      const resetPasswordRequest = await makeRequest("/auth/reset-password", {
        method: "POST",
        data: data,
      });

      return resetPasswordRequest;
    },
    onError: (error) => {
      setResetPasswordError(error);
    },
  });

  const watchAllFields = watch();

  const accessToken = useUserStore((state) => state.accessToken);

  const handleResetPassword = async (data) => {
    const requestPasswordpayload = {
      ...data,
      token: accessToken,
    };
    mutateAsync(requestPasswordpayload);

    setShowStatus(true);
  };

  useEffect(() => {
    let timeout;
    if (showStatus) {
      timeout = setTimeout(() => {
        setShowStatus(false);
        if (isSuccess) {
          setOpenModal(true);
        }
      }, 5000);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [showStatus, isSuccess]);

  return (
    <HelperLayout>
      <div className="reset-password-page w-full flex-center forgot-password-container">
        <div className="reset-password-form w-11/12 bg-white flex flex-col items-center py-[40px] px-[20px] gap-4 text-black lg:w-[450px] 2xl:w-[681px] 2xl:px-[40px]">
          <h1 className="font-IvyPresto my-9 text-2xl lg:text-4xl">
            Reset Password
          </h1>

          {showStatus && isError && (
            <p className="flex w-full justify-center items-center text-red-500">
              {resetPasswordError}
            </p>
          )}

          {showStatus && isSuccess && (
            <p className="flex w-full justify-center items-center text-green-500">
              Password Reset Successful
            </p>
          )}

          <form
            className="w-full flex-center flex-col gap-8"
            onSubmit={handleSubmit(handleResetPassword)}
          >
            <FormInput
              name="newPassword"
              placeholder="New Password"
              inputType="password"
              register={register}
              errors={errors}
              invertText
              value={watchAllFields.newPassword}
              options={{
                required: "New Password is required",
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Your New Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character. Allowed special characters are: @$!%*?&-+_(){}[]:;'\"<>,.?/~#|",
                },
              }}
            />

            <FormInput
              name="confirmPassword"
              placeholder="Confirm Password"
              inputType="password"
              register={register}
              invertText
              value={watchAllFields.confirmPassword}
              errors={errors}
              options={{
                required: "Confirm Password is required",
                validate: (value) =>
                  value === watch("newPassword") || "Passwords do not match",
              }}
            />
            <CustomButton btnName="Reset Password" isPending={isPending} />
          </form>
        </div>
      </div>
    </HelperLayout>
  );
};

export default page;
