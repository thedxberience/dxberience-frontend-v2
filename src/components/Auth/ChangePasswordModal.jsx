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
import CustomButton from "../shared/CustomButton";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { makeRequest } from "@/utils/axios";
import Image from "next/image";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";

const ChangePasswordModal = () => {
  const [changePasswordError, setChangePasswordError] = useState("");
  const [showStatus, setShowStatus] = useState(false);

  const logOutUser = useUserStore((state) => state.logOutUser);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { mutateAsync, isError, isSuccess, isPending } = useMutation({
    mutationKey: ["change-password"],
    mutationFn: async (data) => {
      const changePasswordRequest = await makeRequest("/auth/change-password", {
        method: "POST",
        data: data,
      });

      return changePasswordRequest;
    },
    onError: (error) => {
      setChangePasswordError(error.message);
    },
    onSuccess: () => {
      logOutUser(router);
      console.log("I should be logged out");
    },
  });

  const handleChangePassword = async (data) => {
    mutateAsync(data);

    setShowStatus(true);
  };

  useEffect(() => {
    let timeout;
    if (showStatus) {
      timeout = setTimeout(() => {
        setShowStatus(false);
      }, 5000);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [showStatus]);

  const watchAllFields = watch();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="w-full text-left hover:bg-gray-50 p-2 rounded-md">
          Change Password
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <div className="flex items-center justify-end">
          <AlertDialogCancel className="rounded-[50%] border-dotted p-2 w-auto h-auto">
            <Image src="/add.svg" alt="close_btn" width={12} height={12} />
          </AlertDialogCancel>
        </div>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-IvyPresto text-2xl lg:text-4xl my-9">
            Change Password
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          {showStatus && isSuccess && (
            <div className="w-full text-center text-green-600 p-2 rounded-md">
              Password changed successfully
            </div>
          )}

          {showStatus && isError && (
            <div className="w-full text-center text-red-600 p-2 rounded-md">
              {changePasswordError}
            </div>
          )}

          <form
            className="flex flex-col justify-center items-center gap-8"
            onSubmit={handleSubmit(handleChangePassword)}
          >
            <FormInput
              register={register}
              value={watchAllFields.currentPassword}
              type="password"
              inputType="password"
              name="currentPassword"
              placeholder="Old Password"
              invertText
              errors={errors}
              options={{ required: "Old Password is required" }}
            />
            <FormInput
              type="password"
              inputType="password"
              placeholder="New Password"
              register={register}
              name="newPassword"
              value={watchAllFields.newPassword}
              invertText
              errors={errors}
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
              type="password"
              placeholder="Confirm Password"
              register={register}
              name="confirmPassword"
              inputType="password"
              value={watchAllFields.confirmPassword}
              invertText
              errors={errors}
              options={{
                required: "Confirm Password is required",
                validate: (value) =>
                  value === watch("newPassword") || "Passwords do not match",
              }}
            />
            <CustomButton text="Change Password" isPending={isPending} />
          </form>
        </AlertDialogDescription>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ChangePasswordModal;
