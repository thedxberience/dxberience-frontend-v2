"use client";
import React, { useState, useMemo, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import countryList from "react-select-country-list";
import { useForm } from "react-hook-form";
import FormInput from "../shared/FormInput";

function CountrySelector({ country, setCountry }) {
  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (value) => {
    setCountry(value);
  };

  return (
    <div>
      <Select onValueChange={changeHandler}>
        {country && <label> Country </label>}
        <SelectTrigger
          className={`w-full h-[33px] ${
            !country && "text-gray-400"
          } py-1 outline-none px-0 bg-transparent border-white form-field-border-style`}
        >
          <SelectValue placeholder="Country" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className="font-noah">
            <SelectLabel>Countries</SelectLabel>
            {options?.map((country) => (
              <SelectItem value={country.label} key={country.value}>
                {country.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default CountrySelector;
