"use client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";

import React, { useEffect, useState } from "react";

const Provider = ({ children }) => {
  const [client] = useState(() => new QueryClient());

  // const router = useRouter();
  // const searchParams = useSearchParams();
  // const pathname = usePathname();

  // useEffect(() => {
  //   const affiliateId = useApiStore.getState().affiliateId;

  //   if (affiliateId) {
  //     const affiliateExists = searchParams.get("affiliate");
  //     if (!affiliateExists) {
  //       router.replace(`${pathname}?affiliate=${affiliateId}`);
  //     }
  //   }
  // }, [router, pathname]);

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
