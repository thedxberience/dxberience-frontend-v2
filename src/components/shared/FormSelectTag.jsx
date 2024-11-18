import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function FormSelectTag({
  options,
  label,
  setSelectValue,
  selectValue,
  invert,
}) {
  const handleChangeSelect = (value) => {
    setSelectValue(value);
  };

  return (
    <div className="w-full">
      <Select onValueChange={handleChangeSelect} className="outline-none">
        {selectValue && (
          <label className={`${invert && "text-white"}`}> {label} </label>
        )}
        <SelectTrigger
          className={`w-full bg-transparent border-b-2 border-t-0 border-x-0 rounded-none outline-none ${
            selectValue == "" ? "text-gray-400" : "text-white"
          } `}
        >
          <SelectValue placeholder={label} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => {
              return <SelectItem value={option}>{option}</SelectItem>;
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
