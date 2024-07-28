"use client";
import React, { useState } from "react";
import FormInput from "../shared/FormInput";
import { useForm } from "react-hook-form";
import CustomButton from "../shared/CustomButton";
import CustomSelectTag from "../shared/CustomSelectTag";
import CustomOptionTag from "../shared/CustomOptionTag";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "@/utils/axios";

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

  const {
    data: categoryData,
    error: categoryError,
    isError: isCategoryError,
    isSuccess: isCategorySuccess,
    isLoading: isCategoryLoading,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const data = await makeRequest(`/categories`);
      return data;
    },
  });

  const {
    data: interestData,
    error: interestError,
    isError: isInterestError,
    isSuccess: isInterestSuccess,
    isLoading: isInterestLoading,
  } = useQuery({
    queryKey: ["interests"],
    queryFn: async () => {
      const data = await makeRequest(`/interests`);
      return data;
    },
  });

  const [categotyName, setCategoryName] = useState("Categories");
  const [interestName, setInterestName] = useState("Interest");

  const handleSetCategoryName = (categoryName) => {
    setCategoryName(categoryName);
  };

  const handleSetInterestName = (interestName) => {
    setInterestName(interestName);
  };

  const interestOptions = [
    {
      optionName: "All",
    },
    {
      optionName: "Concierge Services ",
    },
    {
      optionName: "Travel & Holidays",
    },
    {
      optionName: "Luxury Jets & Yachts",
    },
    {
      optionName: "Cars & Chauffeurs",
    },
    {
      optionName: "Sports & Activities",
    },
    {
      optionName: "Spa & Wellness",
    },
    {
      optionName: "Business & Corporate",
    },
    {
      optionName: "Event Tickets",
    },
    {
      optionName: "Nightlife & Clubs",
    },
    {
      optionName: "Fine Dining",
    },
    {
      optionName: "Attractions & Tours",
    },
    {
      optionName: "Beach Clubs & Pools",
    },
  ];

  const watchAllFields = watch();

  return (
    <div className="experience-form w-full lg:w-10/12 h-52 px-5 lg:-mb-20">
      <form className="px-3 lg:px-8 py-6 lg:py-9 flex flex-col lg:flex-row justify-center items-center gap-4 bg-white shadow">
        <div className="categories-interests flex justify-center items-center gap-3 w-full">
          <CustomSelectTag selectTagName={categotyName}>
            {categoryData?.map((option, key) => {
              return (
                <CustomOptionTag
                  optionName={option.name}
                  onSelect={handleSetCategoryName}
                  optionType={`${option.subCategories ? "dropdown" : "text"}`}
                  subCategories={option.subCategories}
                  key={key}
                />
              );
            })}
          </CustomSelectTag>
          <CustomSelectTag selectTagName={interestName}>
            {interestData?.map((option, key) => (
              <CustomOptionTag
                optionName={option.name}
                optionType="checkbox"
                onSelect={handleSetInterestName}
                key={key}
              />
            ))}
          </CustomSelectTag>
        </div>
        <div className="date-no_of_travelers flex justify-center items-center gap-3 w-full">
          <FormInput
            name="date"
            placeholder={"Dates"}
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
          <CustomButton btnName="Find experiences" invert />
        </div>
      </form>
    </div>
  );
};

export default ExperiencesForm;
