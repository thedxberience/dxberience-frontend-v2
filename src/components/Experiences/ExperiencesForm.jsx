"use client";
import React from "react";
import FormInput from "../shared/FormInput";
import { useForm } from "react-hook-form";
import CustomButton from "../shared/CustomButton";

const ExperiencesForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      categories: "",
      interests: "",
      date: "",
      no_of_travellers: "",
      budget: "",
    },
  });

  const watchAllFields = watch();

  return (
    <div className="experience-form lg:w-10/12 h-52 px-5 lg:-mb-20">
      <form className="px-3 lg:px-8 py-6 lg:py-9 flex flex-col lg:flex-row justify-center items-center gap-3 bg-white shadow">
        <div className="categories-interests flex justify-center items-center gap-4 w-full">
          <FormInput
            name="categories"
            placeholder={"Categories"}
            errors={errors}
            register={register}
            value={watchAllFields.categories}
          />
          <FormInput
            name="interests"
            placeholder={"Interests"}
            errors={errors}
            register={register}
            value={watchAllFields.interests}
          />
        </div>
        <div className="date-no_of_travelers flex justify-center items-center gap-4 w-full">
          <FormInput
            name="date"
            placeholder={"Date"}
            errors={errors}
            register={register}
            value={watchAllFields.date}
          />
          <FormInput
            name="no_of_travellers"
            placeholder={"No of Travellers"}
            errors={errors}
            register={register}
            value={watchAllFields.no_of_travellers}
          />
        </div>
        <div className="w-full">
          <FormInput
            name="budget"
            placeholder={"Budget"}
            errors={errors}
            register={register}
            value={watchAllFields.budget}
          />
        </div>
        <div className="flex lg:w-full justify-center items-center">
          <CustomButton btnName="Find preferences" invert />
        </div>
      </form>
    </div>
  );
};

export default ExperiencesForm;
