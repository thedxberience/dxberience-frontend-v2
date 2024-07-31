"use client";
import React, { useState } from "react";
import FormInput from "../shared/FormInput";
import { useForm } from "react-hook-form";
import CustomButton from "../shared/CustomButton";
import CustomSelectTag from "../shared/CustomSelectTag";
import CustomOptionTag from "../shared/CustomOptionTag";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "@/utils/axios";
import { componentUseStore } from "@/store/componentStore";

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
    experienceFormDropdownState,
    toggleCategoryDropdown,
    toggleDateDropdown,
    toggleBudgetDropdown,
    closeCategoryDropdown,
    closeDateDropdown,
    closeBudgetDropdown,
  } = componentUseStore((state) => state);

  const [categoryName, setCategoryName] = useState("Categories");
  const [budget, setBudget] = useState("Budget");
  const [revealOptions, setRevealOptions] = useState({
    categoryDropdown: false,
    dateDropdown: false,
    budgetDropdown: false,
  });

  const handleSetCategoryName = (categoryName) => {
    setCategoryName(categoryName);
  };

  const handleSetBudget = (selectedBudget) => {
    setBudget(selectedBudget);
  };

  const budgetList = [
    {
      min: 0,
      max: 500,
    },
    {
      min: 500,
      max: 1000,
    },
    {
      min: 1000,
      max: 1500,
    },
    {
      min: 1500,
      max: 2000,
    },
    {
      min: 2000,
      max: 2500,
    },
  ];

  const watchAllFields = watch();

  return (
    <div className="experience-form w-full lg:w-10/12 h-52 px-5 lg:-mb-20">
      <form className="px-3 lg:px-8 py-6 lg:py-9 flex flex-col lg:flex-row justify-center items-center gap-4 lg:gap-16 bg-white shadow">
        <div className="categories-interests flex justify-center items-center gap-3 w-full">
          <CustomSelectTag
            revealOptionProps={experienceFormDropdownState}
            setRevealOptionsProps={toggleCategoryDropdown}
            selectTagName={categoryName}
            closeSelectTag={closeCategoryDropdown}
            dropdownType="categories"
          >
            {categoryData?.map((option, key) => {
              return (
                <CustomOptionTag
                  belongsTo="categories"
                  optionName={option.name}
                  onSelect={handleSetCategoryName}
                  optionType={`${option.subCategories ? "dropdown" : "text"}`}
                  subCategories={option.subCategories}
                  key={key}
                />
              );
            })}
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
        </div>
        <div className="w-full">
          <CustomSelectTag
            revealOptionProps={experienceFormDropdownState}
            setRevealOptionsProps={toggleBudgetDropdown}
            selectTagName={budget}
            closeSelectTag={closeBudgetDropdown}
            dropdownType="budget"
          >
            {budgetList?.map((option, key) => {
              const budgetText = `AED ${option.min} - AED ${option.max}`;
              return (
                <CustomOptionTag
                  belongsTo="budget"
                  optionName={budgetText}
                  onSelect={handleSetBudget}
                  optionType={`checkbox`}
                  subCategories={option.subCategories}
                  key={key}
                />
              );
            })}
          </CustomSelectTag>
        </div>
        <div className="flex lg:w-full justify-center items-center">
          <CustomButton btnName="Find experiences" invert />
        </div>
      </form>
    </div>
  );
};

export default ExperiencesForm;
