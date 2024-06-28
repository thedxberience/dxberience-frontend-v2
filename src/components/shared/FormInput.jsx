"use client";
function FormInput({
  name = "input",
  placeholder,
  inputType = "text",
  register,
  errors,
  value,
  options = {},
}) {
  return (
    <div className={`relative flex flex-col w-full `}>
      <label
        htmlFor={name}
        className={`absolute ${value.length > 0 ? "" : "hidden"}`}
      >
        {placeholder}
        {errors[name] && <span className="text-red-500"> *</span>}
      </label>
      <input
        placeholder={placeholder}
        {...register(name, options)}
        id={name}
        type={inputType}
        className={`bg-transparent border-b-[1px] py-1 outline-none ${
          value.length > 0 ? "pt-7" : ""
        }`}
      />
      {errors[name] && (
        <span className="text-red-500">{errors[name].message}</span>
      )}
    </div>
  );
}

export default FormInput;
