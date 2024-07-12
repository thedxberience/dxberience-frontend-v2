import React from "react";
import { useForm } from "react-hook-form";
import FormInput from "@/components/shared/FormInput";
import CustomButton from "../shared/CustomButton";

const EventsBookingForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone_number: "",
      date: "",
      time: "",
      options: "",
      no_of_guest: "",
    },
  });

  const watchAllFields = watch();

  return (
    <div className="contact-form p-4 w-full lg:w-3/12">
      <form className="bg-primary px-11 flex flex-col text-white justify-center items-center w-full h-full py-12">
        <div>
          <h1 className="text-xl lg:text-4xl font-IvyPresto mb-11">
            Booking Details
          </h1>
        </div>
        <div className="flex flex-col gap-10 justify-center items-center w-full">
          <FormInput
            placeholder={"name"}
            register={register}
            errors={errors}
            value={watchAllFields.name}
            name="name"
          />
          <FormInput
            placeholder={"email"}
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
          <div className="flex justify-center items-center gap-4 w-full">
            <FormInput
              placeholder={"Date"}
              register={register}
              errors={errors}
              value={watchAllFields.date}
              name="date"
            />
            <FormInput
              placeholder={"Time"}
              register={register}
              errors={errors}
              value={watchAllFields.time}
              name="time"
            />
          </div>
          <FormInput
            placeholder={"Options"}
            register={register}
            errors={errors}
            value={watchAllFields.options}
            name="options"
          />
          <FormInput
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
          <CustomButton btnName="book now" />
        </div>
      </form>
    </div>
  );
};

export default EventsBookingForm;
