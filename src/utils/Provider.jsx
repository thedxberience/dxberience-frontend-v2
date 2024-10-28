"use client";
import TailoredExperienceBtn from "@/components/shared/TailoredExperienceBtn";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import React, { useState } from "react";

const Provider = ({ children }) => {
  const [client] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={client}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
      <Analytics />
      <SpeedInsights />
    </QueryClientProvider>
  );
};

export default Provider;
