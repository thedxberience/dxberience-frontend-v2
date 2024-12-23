"use client";
import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import FormInput from "../shared/FormInput";
import { useForm } from "react-hook-form";
import Image from "next/image";
import CustomButton from "../shared/CustomButton";
import { useComponentStore } from "@/store/componentStore";
import { makeRequest } from "@/utils/axios";
import { useMutation } from "@tanstack/react-query";

const ForgotPasswordModal = () => {
  const [showStatus, setShowStatus] = useState();
  const [forgotPasswordError, setForgotPasswordError] = useState();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const watchAllFields = watch();

  const { mutateAsync, isSuccess, isError, isPending } = useMutation({
    mutationKey: ["forgot-password", watchAllFields.email],
    mutationFn: async (data) => {
      const forgotPasswordRequest = await makeRequest(
        `/auth/forgot-password?dev=${
          process.env.NEXT_PUBLIC_ENVIRONMENT == "local"
        }`,
        {
          method: "POST",
          data: data,
        }
      );

      return forgotPasswordRequest;
    },
    onError: (error) => {
      setForgotPasswordError(error);
    },
  });

  useEffect(() => {
    if (showStatus) {
      setTimeout(() => {
        setShowStatus(false);
        setOpenForgotPasswordModal(false);
      }, 5000);
    }
  }, [showStatus]);

  const openForgotPasswordModal = useComponentStore(
    (state) => state.openForgotPasswordModal
  );
  const setOpenForgotPasswordModal = useComponentStore(
    (state) => state.setOpenForgotPasswordModal
  );

  const handleForgotPassword = async (data) => {
    mutateAsync(data);

    setShowStatus(true);
  };

  return (
    <AlertDialog
      open={openForgotPasswordModal}
      onOpenChange={(open) => {
        setOpenForgotPasswordModal(open);
      }}
    >
      <AlertDialogContent>
        <div className="flex items-center justify-end">
          <AlertDialogCancel className="rounded-[50%] border-dotted p-2 w-auto h-auto">
            <Image src="/add.svg" alt="close_btn" width={12} height={12} />
          </AlertDialogCancel>
        </div>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-IvyPresto text-2xl lg:text-5xl mb-9">
            Forgot Password
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          <div>
            {showStatus && isSuccess && (
              <p className="flex w-full justify-center items-center text-green-500">
                Password reset link sent to your email
              </p>
            )}

            {showStatus && isError && (
              <p className="flex w-full justify-center items-center text-red-500">
                {forgotPasswordError
                  ? forgotPasswordError.message
                  : "An error occurred"}
              </p>
            )}
          </div>
          <form onSubmit={handleSubmit(handleForgotPassword)}>
            <div className="email">
              <FormInput
                name="email"
                value={watchAllFields.email}
                placeholder={"Email Address*"}
                errors={errors}
                register={register}
                options={{
                  required: "Email is required",
                  pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Invalid email",
                  },
                }}
                invertText
              />
            </div>

            <div className="flex justify-center items-center my-8">
              <CustomButton btnName="Reset Password" isPending={isPending} />
            </div>
          </form>
        </AlertDialogDescription>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ForgotPasswordModal;
