import React from "react";

function GradientBox({
  children,
  from,
  to,
  gradientOn = false,
  className = "",
}) {
  return (
    <div
      className={`bg-gradient-to-br ${
        gradientOn ? `from-[${from}] to-[${to}]` : "md:bg-none"
      } items-center justify-center flex flex-col gap-5 p-10 ${className}`}
    >
      {children}
    </div>
  );
}

export { GradientBox };
