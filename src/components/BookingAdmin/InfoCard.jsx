function InfoCard({ title = "none", amount = 1000 }) {
  return (
    <div className="flex flex-col w-full sm:w-[200px] bg-[#2A2A2A] rounded-[4px] px-5 py-4">
      <span className="text-sm">{title}</span>
      <span className="text-lg font-semibold">{amount}</span>
    </div>
  );
}

export default InfoCard;
