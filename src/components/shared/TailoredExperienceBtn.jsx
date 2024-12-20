"use client";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import TailoredExperienceFloatingForm from "../TailoredExperiences/TailoredExperienceFloatingForm";
import { useComponentStore } from "@/store/componentStore";

const TailoredExperienceBtn = () => {
  const [revealForm, setRevealForm] = useState(false);
  const [stopScroll, setStopScroll] = useState(false);

  const footerHeight = useComponentStore((state) => state.footerHeight);

  const handleScroll = () => {
    if (document) {
      const windowScroll = window.scrollY;
      if (revealForm) {
        document.body.style.position = "fixed";
        document.body.style.top = `-${windowScroll}px`;
        document.body.style.width = "100vw";
      } else {
        const scrollY = document.body.style.top;
        document.body.style.position = "";
        document.body.style.top = "";
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }
  };

  const handleRevealFloatingForm = () => {
    setRevealForm(!revealForm);
  };

  const handleBtnScroll = () => {
    if (window && footerHeight) {
      const documentScrollHeight = document.documentElement.scrollHeight;
      const scrollOfset = documentScrollHeight - (footerHeight * 2 + 100);

      if (window.scrollY > scrollOfset) {
        setStopScroll(true);
      } else {
        setStopScroll(false);
      }
    }
  };

  useEffect(() => {
    if (window) {
      document.addEventListener("scroll", handleBtnScroll);
    }

    return () => {
      document.removeEventListener("scroll", handleBtnScroll);
    };
  }, [footerHeight]);

  function openWhatsapp() {
    window.open("https://wa.me/+971585787558", "_blank");
  }

  useEffect(() => {
    handleScroll();
  }, [revealForm]);

  return (
    <div className="tailored-experience-button fixed top-96 left-0 z-50 cursor-pointer">
      <div
        style={{ bottom: stopScroll ? footerHeight : "" }}
        className={`fixed ${
          revealForm ? "top-0" : stopScroll ? "" : "top-[calc(50%-100px)]"
        } left-0 flex justify-center items-center`}
      >
        {revealForm && (
          <TailoredExperienceFloatingForm
            revealForm={revealForm}
            setRevealForm={setRevealForm}
          />
        )}

        <div className="overflow-hidden">
          <div
            className="bg-primary p-3 flex flex-col justify-evenly gap-2 w-12 h-[16rem] 2xl:h-52 py-2 overflow-hidden"
            onClick={handleRevealFloatingForm}
          >
            <p className="text-white tailored-text w-36 h-36 font-bold whitespace-nowrap">
              Tailored Experiences
            </p>
            {/* <Image
              src={"/tailored_star.svg"}
              alt="star"
              width={24}
              height={24}
            /> */}
          </div>
          {revealForm ? (
            <div
              className="bg-[#D39903] flex justify-center items-center p-3 w-12 h-12"
              onClick={() => setRevealForm(false)}
            >
              <Image
                src={"/close_form.svg"}
                alt="whatsapp"
                width={14}
                height={14}
              />
            </div>
          ) : (
            <div
              className="bg-[#27B43E] flex justify-center items-center p-3 w-12 h-12"
              onClick={openWhatsapp}
            >
              <Image
                src={"/whatsapp_logo.png"}
                alt="whatsapp"
                width={24}
                height={24}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TailoredExperienceBtn;
