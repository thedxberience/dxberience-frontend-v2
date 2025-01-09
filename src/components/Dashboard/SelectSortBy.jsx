import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useComponentStore } from "@/store/componentStore";

const SelectSortBy = () => {
  const setFilterData = useComponentStore((state) => state.setFilterData);

  const handleSelectSort = (sortBy) => {
    setFilterData({
      sortBy: sortBy,
    });
  };

  return (
    <div>
      <Select onValueChange={handleSelectSort}>
        <SelectTrigger className="w-[222px] bg-transparent border-x-0 border-t-0 rounded-none text-lg border-b-[0.5px] border-b-[#4e4e4e]">
          <SelectValue placeholder="Sort by:" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="MOST RECENT">Most Recent</SelectItem>
          <SelectItem value="LEAST RECENT">Least Recent</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectSortBy;
