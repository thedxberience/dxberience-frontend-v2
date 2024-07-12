"use client";
import React, { useState } from "react";
import FormInput from "../shared/FormInput";
import { useForm } from "react-hook-form";
import CustomButton from "../shared/CustomButton";
import CustomSelectTag from "../shared/CustomSelectTag";
import CustomOptionTag from "../shared/CustomOptionTag";

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

  const [categotyName, setCategoryName] = useState("Categories");
  const [interestName, setInterestName] = useState("Interest");

  const handleSetCategoryName = (categoryName) => {
    setCategoryName(categoryName);
  };

  const handleSetInterestName = (interestName) => {
    setInterestName(interestName);
  };

  const categoryOptions = [
    {
      optionName: "All",
    },
    {
      optionName: "VIP Concierge",
    },
    {
      optionName: "Luxury Rentals",
    },
    {
      optionName: "Private Jets",
    },
    {
      optionName: "Experiences",
    },
    {
      optionName: "Yachts",
    },
    {
      optionName: "Reservations",
    },
    {
      optionName: "Luxury Stays",
    },
    {
      optionName: "Events",
    },
    {
      optionName: "Visa Services",
    },
  ];
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
    <div className="experience-form lg:w-10/12 h-52 px-5 lg:-mb-20">
      <form className="px-3 lg:px-8 py-6 lg:py-9 flex flex-col lg:flex-row justify-center items-center gap-3 bg-white shadow">
        <div className="categories-interests flex justify-center items-center gap-3 w-full">
          <CustomSelectTag selectTagName={categotyName}>
            {categoryOptions.map((option, key) => (
              <CustomOptionTag
                optionName={option.optionName}
                onSelect={handleSetCategoryName}
                key={key}
              />
            ))}
          </CustomSelectTag>
          <CustomSelectTag selectTagName={interestName}>
            {interestOptions.map((option, key) => (
              <CustomOptionTag
                optionName={option.optionName}
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
