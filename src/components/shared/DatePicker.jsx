"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function DatePickerWithPresets({ date, setDate, invert = false }) {
  return (
    <div>
      {date && <label>Date</label>}
      <Popover children>
        <PopoverTrigger asChild>
          <Button
            variant={"ghost"}
            className={cn(
              "w-full justify-start hover:bg-transparent text-left py-0 font-noah border  border-x-none rounded-none border-l-0 border-t-0 border-r-0",
              !date && "text-black",
              invert ? "border-b-white text-white" : "border-b-black"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? (
              format(date, "PPP")
            ) : (
              <span className="text-gray-300">Date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex font-noah w-auto flex-col space-y-2 p-2">
          <Select
            onValueChange={(value) =>
              setDate(addDays(new Date(), parseInt(value)))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="0">Today</SelectItem>
              <SelectItem value="1">Tomorrow</SelectItem>
              <SelectItem value="3">In 3 days</SelectItem>
              <SelectItem value="7">In a week</SelectItem>
            </SelectContent>
          </Select>
          <div className="rounded-md border font-noah">
            <Calendar
              mode="single"
              className={"font-noah"}
              selected={date}
              onSelect={setDate}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}