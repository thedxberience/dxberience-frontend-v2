"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import FormInput from "@/components/shared/FormInput";
import CustomButton from "../shared/CustomButton";
import { useMutation } from "@tanstack/react-query";
import { makeRequest } from "@/utils/axios";
import { useRouter } from "next/navigation";
import CountrySelector from "../NewsletterSection/CountrySelect";
import { DatePickerWithPresets } from "../shared/DatePicker";
import { useApiStore } from "@/store/apiStore";

const EventsBookingForm = ({ slug, price, product }) => {
  const router = useRouter();
  const [country, setCountry] = useState();
  const [date, setDate] = React.useState();
  const [showStatus, setShowStatus] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone_number: "",
      country: "",
      date: "",
      time: "",
      no_of_guest: "1",
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
      if (request["statusCode"] !== 400) {
        router.push("/booking-confirmation");
      }
      return request;
    },
  });

  const watchAllFields = watch();

  const handleSubmitBookingRequest = (data) => {
    const payload = {
      customerName: `${data.firstName} ${data.lastName}`,
      customerEmail: data.email,
      customerPhone: data.phone_number,
      country: country,
      date: date,
      time: data.time,
      productName: product,
      productSlug: slug,
      productPrice: price,
      noOfTickets: parseInt(data.no_of_guest),
      partnerId: affiliateId,
    };

    mutateAsync(payload);
  };

  useEffect(() => {
    setTimeout(() => {
      setShowStatus(false);
    }, 5000);
  }, [showStatus]);

  return (
    <div className="contact-form p-4 w-full lg:w-4/12">
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

        <div className="flex flex-col gap-10 justify-center items-center w-full">
          <FormInput
            placeholder={"First Name"}
            register={register}
            errors={errors}
            value={watchAllFields.firstName}
            name="firstName"
          />
          <FormInput
            placeholder={"Last Name"}
            register={register}
            errors={errors}
            value={watchAllFields.lastName}
            name="lastName"
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
            value={watchAllFields.phone_number}
            name="phone_number"
          />
          <div className="w-full">
            <CountrySelector country={country} setCountry={setCountry} />
          </div>
          <div className="flex justify-center items-center gap-4 w-full">
            <div className="w-full">
              <DatePickerWithPresets date={date} setDate={setDate} invert />
            </div>
            <div className="w-full">
              <FormInput
                placeholder={"Time"}
                register={register}
                errors={errors}
                value={watchAllFields.time}
                name="time"
                inputType="time"
              />
            </div>
          </div>
          {/* <FormInput
            placeholder={"Options"}
            register={register}
            errors={errors}
            value={watchAllFields.options}
            name="options"
          /> */}
          <FormInput
            inputType="number"
            placeholder={"No of Guest/Tickets"}
            register={register}
            errors={errors}
            value={watchAllFields.no_of_guest}
            name="no_of_guest"
          />
        </div>
        <div>
          <p className="text-white text-center text-xs pb-11 pt-6 font-thin">
            Our team will reach out to finalize your booking and payment. We
            will customize the experience to suit your needs.
          </p>
        </div>
        <div>
          <CustomButton btnName={"book now"} isPending={isPending} />
        </div>
      </form>
    </div>
  );
};

export default EventsBookingForm;
