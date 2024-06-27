import React from "react";
import { useState } from "react";

function FormInput({
  name = "input",
  inputType = "text",
  validator = () => false,
}) {
  const [valid, setValid] = useState(false);
  const [typing, setTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");

  return (
    <div
      className={`relative flex flex-col w-full ${
        typing || inputValue !== "" ? "mt-5" : ""
      }`}
    >
      <label
        htmlFor={name}
        className={`absolute ${
          typing || inputValue !== "" ? "-top-4" : "top-1"
        }`}
      >
        {name}
        {valid ? "" : " *"}
      </label>
      <input
        id={name}
        type={inputType}
        className="bg-transparent border-b-[1px] py-1 outline-none"
        onFocus={() => setTyping(true)}
        onChange={async (e) => {
          setValid(await validator(e.target.value));
          setInputValue(e.target.value);
        }}
        onBlur={() => setTyping(false)}
      />
    </div>
  );
}

export default FormInput;
