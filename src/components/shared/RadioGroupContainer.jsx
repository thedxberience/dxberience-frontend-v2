import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useComponentStore } from "@/store/componentStore";

const RadioGroupContainer = ({ radioItems, radioType }) => {
  const filterData = useComponentStore((state) => state.filterData);
  const setFilterData = useComponentStore((state) => state.setFilterData);

  const handleDateRange = (filter) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let startDate;

    switch (filter.toLowerCase()) {
      case "last 30 days":
        startDate = new Date();
        startDate.setDate(today.getDate() - 30);
        break;
      case "last 3 months":
        startDate = new Date();
        startDate.setMonth(today.getMonth() - 3);
        break;
      case "last 6 months":
        startDate = new Date();
        startDate.setMonth(today.getMonth() - 6);
        break;
      case "last year":
        startDate = new Date();
        startDate.setFullYear(today.getFullYear() - 1);
        break;
      default:
        return {
          startDate: "",
          endDate: "",
        };
    }

    const formatDate = (date) => {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();

      return `${day}-${month}-${year}`;
    };

    return {
      startDate: formatDate(startDate),
      endDate: formatDate(today),
    };
  };

  const handleFilterOptionChange = (filterValue) => {
    if (radioType == "status") {
      setFilterData({
        confirmationStatus:
          filterValue.toLowerCase() == "all" ? "" : filterValue,
      });
    } else if (radioType == "date") {
      const { startDate, endDate } = handleDateRange(filterValue);
      setFilterData({
        startDate,
        endDate,
      });
    }
  };

  const handleDefaultRadioGroupSelection = () => {
    if (radioType == "status") {
      if (filterData.confirmationStatus === "") {
        return "All";
      } else {
        return filterData.confirmationStatus;
      }
    } else if (radioType == "date") {
      if (filterData.startDate === "" && filterData.endDate === "") {
        return "All";
      } else {
        const { startDate, endDate } = filterData;
        let matchValue = "";
        radioItems.forEach((item) => {
          const checkDate = handleDateRange(item.value);

          if (
            startDate == checkDate.startDate &&
            endDate == checkDate.endDate
          ) {
            matchValue = item.value;
          }
        });
        return matchValue;
      }
    } else {
      return "All";
    }
  };

  return (
    <RadioGroup
      onValueChange={handleFilterOptionChange}
      className="gap-4 w-full"
      defaultValue={handleDefaultRadioGroupSelection}
    >
      {radioItems.map((item, index) => {
        return (
          <div
            key={index}
            className="flex justify-between items-center w-full space-x-2"
          >
            <Label htmlFor={item.value}>{item.name}</Label>

            <RadioGroupItem value={item.value} id={item.value} />
          </div>
        );
      })}
    </RadioGroup>
  );
};
export default RadioGroupContainer;
