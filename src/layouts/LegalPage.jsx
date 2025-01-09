"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/shared/Footer";
import React, { Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "@/utils/axios";
import { PortableText } from "@portabletext/react";
import LoadingIcon from "@/components/shared/LoadingIcon";

const LegalPageLayout = ({ pageName, lastUpdated, children }) => {
  const { data, isLoading, isSuccess, isError, error } = useQuery({
    queryKey: ["legal", pageName],
    queryFn: async () => {
      const getLegalPageContent = await makeRequest("/legal/v1");

      return getLegalPageContent[0];
    },
  });

  const handleLastUpdated = () => {
    if (isLoading) {
      return "...";
    }
    if (isSuccess && data) {
      const lastUpdated = new Date(data._updatedAt);

      const lastUpdatedFormatted = lastUpdated.toDateString();

      return lastUpdatedFormatted;
    }
  };

  const handleRenderChildren = () => {
    if (isError) {
      return <div className="w-full h-full flex-start">{error}</div>;
    }
    if (isLoading) {
      return (
        <div className="w-full h-full flex-center">
          <LoadingIcon />
        </div>
      );
    }
    if (isSuccess && data) {
      switch (pageName.toLowerCase()) {
        case "terms & conditions":
          return <PortableText value={data.terms_condition} />;
        case "privacy policy":
          return <PortableText value={data.privacy_policy} />;
        default:
          break;
      }
    } else {
      return <p>NO {pageName} contetn available at the moment</p>;
    }
  };

  return (
    <main className="w-full flex-center flex-col gap-10">
      <Suspense fallback={<div>Loading...</div>}>
        <Navbar />
      </Suspense>
      <section className="w-11/12 flex flex-col justify-start items-start gap-10">
        <div className="w-full flex-start gap-2 items-center">
          <div className="rounded-[50%] bg-text-primary w-3 h-3"></div>
          <p>LEGAL</p>
        </div>
        <div className="w-full">
          <h1 className="text-4xl lg:text-7xl font-IvyPresto">{pageName}</h1>
        </div>
      </section>
      <section className="flex justify-start items-start min-h-screen mt-3 w-11/12 h-full">
        <div className="flex-between w-11/12 h-full flex-col items-start lg:flex-row gap-5">
          <div className="w-full lg:w-6/12">
            <p className="text-lg flex-start">
              This was last updated {handleLastUpdated()}.
            </p>
          </div>
          <div className="legal-page-content-container w-full lg:w-6/12">
            {children}

            {handleRenderChildren()}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default LegalPageLayout;
