"use client";
import React, { useEffect, useRef, useState } from "react";
import FormInput from "../shared/FormInput";
import { useForm } from "react-hook-form";
import CustomButton from "../shared/CustomButton";
import CustomSelectTag from "../shared/CustomSelectTag";
import CustomOptionTag from "../shared/CustomOptionTag";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "@/utils/axios";
import { useComponentStore } from "@/store/componentStore";
import { DatePickerWithPresets } from "../shared/DatePicker";
import { DatePickerWithRange } from "../shared/DateRangePicker";
import { useApiStore } from "@/store/apiStore";
import { isError } from "react-query";

const ExperiencesForm = ({ setApiParams, isProductLoading }) => {
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
    toggleBudgetDropdown,
    closeCategoryDropdown,
    closeBudgetDropdown,
    categoryFromSlug,
    categorySlugDisplay,
  } = useComponentStore((state) => state);

  const { setProductData } = useApiStore((state) => state);

  const btnRef = useRef();
  const [isSubCategory, setIsSubCategory] = useState(false);
  // const [apiParams, setApiParams] = useState("");
  const [categoryName, setCategoryName] = useState("Categories");
  const [budget, setBudget] = useState("Budget");
  const [budgetRange, setBudgetRange] = useState({
    min: 0,
    max: 0,
  });
  const [date, setDate] = useState();

  // const {
  //   data: productData,
  //   error: productError,
  //   isError: isProductError,
  //   isSuccess: isProductSuccess,
  //   isLoading: isProductLoading,
  // } = useQuery({
  //   queryKey: ["product", apiParams],
  //   queryFn: async () => {
  //     const data = await makeRequest(apiParams);
  //     if (!isProductError) {
  //       setProductData(productData);
  //     }
  //     return data;
  //   },
  //   enabled: apiParams != "",
  // });

  const handleSetCategoryName = (categoryName) => {
    setCategoryName(categoryName);
  };

  const handleSetBudget = (selectedBudget) => {
    setBudget(selectedBudget);
  };

  const budgetList = [
    {
      min: 0,
      max: 0,
    },
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
    {
      min: 2500,
    },
  ];

  const handleFindExperiences = (e, categoryFromSlug = null) => {
    e?.preventDefault();

    let apiParams = "/product";

    function handleAppendSign() {
      if (apiParams == "/product") {
        return "?";
      } else {
        return "&";
      }
    }

    if (categoryFromSlug) {
      apiParams += `${handleAppendSign()}category=${categoryFromSlug}`;
    } else {
      if (categoryName.toLowerCase() != "all") {
        if (isSubCategory) {
          apiParams += `${handleAppendSign()}subCategory=${categoryName}`;
        } else if (!isSubCategory) {
          apiParams += `${handleAppendSign()}category=${categoryName}`;
        }
      }

      if (budget != "Budget" && (budgetRange.min || budgetRange.max)) {
        if (budgetRange.min) {
          apiParams += `${handleAppendSign()}minBudget=${budgetRange.min}`;
        } else {
          apiParams += `${handleAppendSign()}minBudget=${
            budgetRange.min
          }&maxBudget=${budgetRange.max}`;
        }
      }

      if (date) {
        const startDate = new Date(date.from).toISOString();
        apiParams += `${handleAppendSign()}startDate=${startDate}`;

        if (date.to) {
          const endDate = new Date(date.to).toISOString();
          apiParams += `${handleAppendSign()}endDate=${endDate}`;
        }
      }
    }

    setApiParams(apiParams);
  };

  useEffect(() => {
    if (categoryFromSlug) {
      setCategoryName(categorySlugDisplay);
      if (
        categoryFromSlug.toLowerCase() != "categories" &&
        categoryFromSlug.toLowerCase() != "all"
      ) {
        handleFindExperiences(null, categoryFromSlug);
      }
    }
  }, [categoryFromSlug]);

  return (
    <div className="experience-form w-full lg:w-10/12 h-52 px-5 lg:-mb-20">
      <form
        onSubmit={handleFindExperiences}
        className="px-3 lg:px-8 py-6 lg:py-9 flex flex-col lg:flex-row justify-center items-center gap-4 lg:gap-16 bg-white shadow"
      >
        <div className="categories-interests flex justify-center items-center gap-3 w-full">
          <CustomSelectTag
            revealOptionProps={experienceFormDropdownState}
            setRevealOptionsProps={toggleCategoryDropdown}
            selectTagName={categoryName}
            closeSelectTag={closeCategoryDropdown}
            dropdownType="categories"
          >
            <CustomOptionTag
              belongsTo="categories"
              setIsSubCategory={setIsSubCategory}
              optionName={"All"}
              onSelect={handleSetCategoryName}
              optionType={`text`}
            />
            {categoryData?.map((option, key) => {
              return (
                <CustomOptionTag
                  belongsTo="categories"
                  setIsSubCategory={setIsSubCategory}
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
          <DatePickerWithRange date={date} setDate={setDate} />
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
              let budgetText = `AED ${option.min} - AED ${option.max}`;
              if (!option.min && !option.max) {
                budgetText = "All";
              } else if (option.min && !option.max) {
                budgetText = `AED ${option.min} and above`;
              }
              return (
                <CustomOptionTag
                  belongsTo="budget"
                  optionName={budgetText}
                  onSelect={handleSetBudget}
                  budgetRange={option}
                  setBudgetRange={setBudgetRange}
                  optionType={`radio`}
                  subCategories={option.subCategories}
                  key={key}
                />
              );
            })}
          </CustomSelectTag>
        </div>
        <div className="flex lg:w-full justify-center items-center">
          <CustomButton
            btnRef={btnRef}
            btnName="Find experiences"
            isPending={isProductLoading}
            invert
          />
        </div>
      </form>
    </div>
  );
};

export default ExperiencesForm;
