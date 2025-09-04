"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingFormSchema } from "@/schemas/bookingFormSchema";
import FormInput from "@/components/shared/FormInput";
import CustomButton from "../shared/CustomButton";
import { useMutation } from "@tanstack/react-query";
import { makeRequest } from "@/utils/axios";
import { useRouter } from "next/navigation";
import { useApiStore } from "@/store/apiStore";
import { useUserStore } from "@/store/userStore";
import Link from "next/link";

const EventsBookingForm = ({ slug, price, product }) => {
  const router = useRouter();
  const [showStatus, setShowStatus] = useState(false);
  const user = useUserStore((state) => state.user);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: user ? user.name : "",
      email: user ? user.email : "",
      phone: "",
    },
  });

  const affiliateId = useApiStore((state) => state.affiliateId);

  const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
    mutationKey: ["create-booking-request", slug],
    mutationFn: async (data) => {
      const request = await makeRequest("/booking", {
        method: "POST",
        data: data,
      });
      // console.log(request);
      setShowStatus(true);
      return request;
    },
  });

  const watchAllFields = watch();

  const handleSubmitBookingRequest = async (data) => {
    // get the referral code from the cookie using the document.cookie
    const referralCode = document.cookie
      .split("; ")
      .find((row) => row.startsWith("referral="))
      ?.split("=")[1];
    const payload = {
      customerName: data.name,
      customerEmail: data.email,
      customerPhone: data.phone,
      productName: product,
      productSlug: window.location.href,
      productPrice: price ?? 0,
      partnerId: affiliateId ? affiliateId : "",
      referralCode: referralCode ? referralCode : "",
    };

    await mutateAsync(payload);
  };

  useEffect(() => {
    let timeout;
    if (showStatus) {
      timeout = setTimeout(() => {
        setShowStatus(false);
      }, 5000);
    }
    if (isSuccess) {
      router.push("/booking-confirmation");
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [showStatus, isSuccess]);

  return (
    <div className="hide-scrollbar p-4 w-full lg:w-4/12">
      <form
        className="bg-primary px-11 flex flex-col text-white justify-center items-center w-full h-full py-12"
        onSubmit={handleSubmit(handleSubmitBookingRequest)}
      >
        <div>
          <h1 className="text-xl lg:text-4xl font-IvyPresto mb-11">
            Booking Details
          </h1>
        </div>
        {isSuccess && showStatus && (
          <div>
            <p className="text-green-400">
              Thank you! we will reach out to you shortly.
            </p>
          </div>
        )}
        {isError && showStatus && (
          <div>
            <p className="text-red-400">{error.message}</p>
          </div>
        )}

        <div className="flex flex-col gap-10 justify-center items-center w-full event-booking-form">
          <FormInput
            placeholder={"Name"}
            register={register}
            errors={errors}
            value={watchAllFields.name}
            name="name"
          />
          <FormInput
            placeholder={"Email"}
            register={register}
            errors={errors}
            value={watchAllFields.email}
            name="email"
          />
          <FormInput
            placeholder={"Phone Number"}
            register={register}
            errors={errors}
            value={watchAllFields.phone}
            name="phone"
            inputType="tel"
            setValue={setValue}
          />
        </div>
        <div>
          <p className="text-white text-center text-xs pb-6 pt-6 font-thin">
            Our team will reach out to finalize your booking and payment. We
            will customize the experience to suit your needs.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <CustomButton btnName={"book now"} isPending={isPending} />
          <p className="text-white text-center text-xs pt-6 font-thin">
            By submitting this form, you agree to our{" "}
            <Link href="/privacy-policy" className="underline">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href="/terms-and-conditions" className="underline">
              Terms and Conditions
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default EventsBookingForm;
