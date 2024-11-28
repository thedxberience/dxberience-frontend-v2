import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import Image from "next/image";
import RadioGroupContainer from "../shared/RadioGroupContainer";

const FilterPopover = () => {
  const filterByStatus = [
    {
      name: "All",
      value: "All",
    },
    {
      name: "Reservations Confirmed",
      value: "CONFIRMED",
    },
    {
      name: "Reservations Pending",
      value: "PENDING",
    },
    {
      name: "Cancellation Confirmed",
      value: "CANCELLED",
    },
    {
      name: "Cancellation Pending",
      value: "PENDING CANCELLATION",
    },
  ];

  const filterByDate = [
    {
      name: "All",
      value: "All",
    },
    {
      name: "Last 30 Days",
      value: "last 30 days",
    },
    {
      name: "Last 3 Months",
      value: "last 3 months",
    },
    {
      name: "Last 6 Months",
      value: "last 6 months",
    },
    {
      name: "Last Year",
      value: "last year",
    },
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost">
          {" "}
          <div className="filters flex-center gap-4">
            <Image
              src="/filter_icon.svg"
              alt="filter icon"
              width={25}
              height={25}
            />

            <p className="text-lg">Filters</p>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="flex flex-col gap-12 justify-start items-start">
          <div className="status flex flex-col justify-start items-start gap-4 w-full">
            <div className="popover-group-header">
              <h3 className="text-lg">Fiter by Status</h3>
            </div>
            <div className="w-full">
              <div className="flex flex-col gap-4 justify-start items-start w-full">
                <RadioGroupContainer
                  radioItems={filterByStatus}
                  radioType={"status"}
                />
              </div>
            </div>
          </div>
          <div className="date flex flex-col justify-start items-start w-full gap-4">
            <div className="popover-group-header">
              <h3 className="text-lg">Fiter by Date</h3>
            </div>
            <div className="w-full">
              <div className="flex flex-col gap-4 w-full justify-start items-start">
                <RadioGroupContainer
                  radioItems={filterByDate}
                  radioType={"date"}
                />
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FilterPopover;
