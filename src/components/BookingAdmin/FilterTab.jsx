function FilterTabs({ name, count = 0, isActive, onClick }) {
  return (
    <div
      className={`cursor-pointer flex gap-2 justify-center items-center px-4 py-2  ${
        isActive ? "border-b-[1px] border-[#5580b5]" : "border-[#333233]"
      }`}
      onClick={onClick}
    >
      <span className={`${isActive ? "text-[#5580b5]" : ""}`}>{name}</span>
      <div
        className={`${
          isActive ? "bg-[#0d4ce9]" : ""
        } px-2 py-[2px] rounded-[2px] text-xs`}
      >
        {count}
      </div>
    </div>
  );
}

export default FilterTabs;
