function StatusDiv({ data, mapping }) {
  return (
    <span
      className={`${mapping[data?.toLowerCase()]} px-2 py-[2px] rounded-full 
    `}
    >
      {data?.toLowerCase()}
    </span>
  );
}

export default StatusDiv;
