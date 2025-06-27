"use client";
import { useComponentStore } from "@/store/componentStore";
import Image from "next/image";
import React from "react";

const SectionDVideo = ({ src, alt }) => {
  const setShowVideoModal = useComponentStore(
    (state) => state.setShowVideoModal
  );
  return (
    <div className="section-d-video">
      <div
        className="relative w-[90svw] lg:w-[82.813vw] h-[222px] lg:h-[74.093vh] flex-center cursor-pointer"
        onClick={() => setShowVideoModal(true)}
      >
        <Image src={src} alt={alt} className="object-cover" fill />
        <Image
          src="/play_btn.png"
          alt="Play Buttton"
          className="object-cover relative z-20"
          width={135}
          height={135}
        />
      </div>
    </div>
  );
};

export default SectionDVideo;
