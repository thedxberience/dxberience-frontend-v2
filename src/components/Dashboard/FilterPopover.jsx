import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import Image from "next/image";

const FilterPopover = () => {
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
          <div className="status flex flex-col justify-start items-start gap-4">
            <div className="popover-group-header">
              <h3 className="text-lg">Fiter by Status</h3>
            </div>
            <div>
              <div className="flex flex-col gap-4 justify-start items-start">
                <div>
                  <p className="text-sm">Reservations Confirmed</p>
                </div>
                <div>
                  <p className="text-sm">Reservations Pending</p>
                </div>
                <div>
                  <p className="text-sm">Cancellation Confirmed</p>
                </div>
                <div>
                  <p className="text-sm">Cancellation Pending</p>
                </div>
              </div>
            </div>
          </div>
          <div className="date flex flex-col justify-start items-start gap-4">
            <div className="popover-group-header">
              <h3 className="text-lg">Fiter by Date</h3>
            </div>
            <div>
              <div className="flex flex-col gap-4 justify-start items-start">
                <div>
                  <p className="text-sm">Last 30 Days</p>
                </div>
                <div>
                  <p className="text-sm">Last 3 Months</p>
                </div>
                <div>
                  <p className="text-sm">Last 6 Months</p>
                </div>
                <div>
                  <p className="text-sm">Last Yearg</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FilterPopover;
