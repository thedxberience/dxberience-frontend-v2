"use client";
import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimate, scroll, progress } from "framer-motion";

const ImageScrollMotion = ({ children, querySelector, maxScroll = 60 }) => {
  const imageViewRef = useRef(null);

  const imageInView = useInView(imageViewRef);

  useEffect(() => {
    if (document) {
      const imageToScroll = document.querySelector(querySelector);
      console.log(`document exists`);
      if (imageInView) {
        scroll((progress) => {
          let progressScroll = (progress * 330) % maxScroll;
          // console.log(
          //   `${querySelector} in view, scroll: ${progress}, motion: ${progressScroll}, ${imageToScroll.parentElement.offsetTop}`
          // );
          if (progressScroll < maxScroll) {
            imageToScroll.style.width = "unset";
            imageToScroll.style.height = "unset";
            imageToScroll.style.position = "relative";
            imageToScroll.style.transform = `translate3d(0, -${progressScroll}vh, 0)`;
          }
        });
      } else {
        return;
      }
    }
  }, [imageInView]);

  return (
    <div className="overflow-hidden w-fit" ref={imageViewRef}>
      <motion.div>{children}</motion.div>
    </div>
  );
};

export default ImageScrollMotion;
