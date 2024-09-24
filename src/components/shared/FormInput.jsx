"use client";

import Image from "next/image";
import { useState } from "react";

function FormInput({
  name = "input",
  placeholder,
  inputType = "text",
  register,
  errors,
  value,
  invertText = false,
  options = {},
}) {
  const handleInputType = () => {
    const [showPassword, setShowPassword] = useState(false);
    switch (inputType) {
      case "text":
        return (
          <input
            placeholder={placeholder}
            {...register(name, options)}
            id={name}
            type={inputType}
            className={`bg-transparent border-b-[1px] py-1 outline-none ${
              value.length > 0 ? "pt-7" : ""
            }`}
          />
        );
      case "textarea":
        return (
          <textarea
            placeholder={placeholder}
            {...register(name, options)}
            id={name}
            type={inputType}
            className={`bg-transparent border-b-[1px] py-1 outline-none ${
              value.length > 0 ? "pt-7" : ""
            }`}
          ></textarea>
        );

      case "time":
        return (
          <input
            placeholder={placeholder}
            {...register(name, options)}
            id={name}
            type={inputType}
            className={`bg-transparent border-b-[1px] pt-2 pb-1 outline-none ${
              value.length > 0 ? "pt-8" : ""
            }`}
          />
        );
      case "password":
        return (
          <div
            className={`bg-transparent w-full flex-center border-b-[1px] py-1 outline-none ${
              value.length > 0 ? "pt-7" : ""
            }`}
          >
            <input
              placeholder={placeholder}
              {...register(name, options)}
              id={name}
              type={showPassword ? "text" : inputType}
              autoComplete="new-password"
              className={`bg-transparent border-none outline-none`}
            />

            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <Image
                  src="/eye-slash.svg"
                  alt="hide password"
                  width={24}
                  height={24}
                />
              ) : (
                <Image
                  src="/eye.svg"
                  alt="show password"
                  width={24}
                  height={24}
                />
              )}
            </span>
          </div>
        );
      default:
        return (
          <input
            placeholder={placeholder}
            {...register(name, options)}
            id={name}
            type={inputType}
            className={`bg-transparent border-b-[1px] py-1 outline-none ${
              value.length > 0 ? "pt-7" : ""
            }`}
          />
        );
    }
  };

  return (
    <div
      className={`relative flex flex-col w-full ${
        invertText ? "text-black" : "text-white"
      }`}
    >
      <label
        htmlFor={name}
        className={`absolute ${value.length > 0 ? "" : "hidden"}`}
      >
        {placeholder}
        {errors[name] && <span className="text-red-500"> *</span>}
      </label>
      {handleInputType()}
      {errors[name] && (
        <span className="text-red-500">
          {errors[name].message ? errors[name].message : `${name} is not valid`}
        </span>
      )}
    </div>
  );
}

export default FormInput;
