"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormInput from "../shared/FormInput";
import CustomCheckBox from "../shared/CustomCheckBox";
import CustomButton from "../shared/CustomButton";
import { useMutation } from "@tanstack/react-query";
import { makeRequest } from "@/utils/axios";
import { useApiStore } from "@/store/apiStore";
import { useRouter } from "next/navigation";

const LoginForm = ({ admin = true }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      refreshToken: true,
    },
  });

  const router = useRouter();
  const data = useApiStore((state) => state);

  const { setLoginError, login, loginError } = useApiStore((state) => ({
    setLoginError: state.setLoginError,
    login: state.login,
    loginError: state.loginError,
  }));

  const watchAllFields = watch();

  const [rememberMe, setRememberMe] = useState();
  const [showStatus, setShowStatus] = useState();

  //   const [loginError, setLoginError] = useState("");

  const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
    mutationKey: ["login", watchAllFields.email],
    mutationFn: async (data) => {
      const loginRequest = await login(data);
      // console.log(`LoginRequest: ${JSON.stringify(loginRequest)}`);

      if (loginRequest.success) {
        router.push("/admin");
      }

      return loginRequest;
    },
    onError: (error, vsriables, context) => {
      setLoginError(error.message);
    },
  });

  const handleLogin = async (data) => {
    await mutateAsync(data);
    setShowStatus(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setShowStatus(false);
      setLoginError("");
    }, 5000);
  }, [showStatus]);

  return (
    <form
      className="flex flex-col justify-start items-start gap-10 w-full px-2 overflow-auto"
      onSubmit={handleSubmit(handleLogin)}
    >
      {showStatus && loginError && (
        <p className="flex w-full justify-center items-center text-red-500">
          {loginError}
        </p>
      )}

      {showStatus && !loginError && isSuccess && !isPending && (
        <p className="flex w-full justify-center items-center text-green-500">
          Log In Successful
        </p>
      )}
      <div className="w-full flex flex-col gap-4">
        <div className="w-full flex flex-col gap-10">
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
        </div>

        {/* <span className="text-sm">Forgot Password?</span>
        <div className="flex flex-col justify-start items-start gap-9">
          <div className="flex justify-start items-center gap-2">
            <CustomCheckBox selected={rememberMe} setSelected={setRememberMe} />
            <p>Remember Me</p>
          </div>
        </div> */}
      </div>

      <div className="w-full flex justify-center items-center pb-4">
        <CustomButton btnName="log in" isPending={isPending} invert />
      </div>
    </form>
  );
};

export default LoginForm;
