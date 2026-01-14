import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const PopoverContainer = ({ popoverTitle, children, className = {} }) => {
  return (
    <Popover>
      <PopoverTrigger
        className={`mix-blend-darken bg-transparent ${className}`}
      >
        <span className="uppercase">{popoverTitle}</span>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex justify-start items-center">
          <ul className="flex flex-col justify-start items-start gap-9 px-4 py-2 uppercase">
            {children}
          </ul>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverContainer;
