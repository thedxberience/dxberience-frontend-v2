"use client";
import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

const TextMotion = ({ children, animateType = "left" }) => {
  const inViewRef = useRef(null);
  const componentInView = useInView(inViewRef, { once: true });

  const revealTextLeft = {
    from: {
      x: -140,
      y: 100,
      rotate: -180,
    },
    to: {
      x: 0,
      y: 0,
      rotate: 0,
    },
  };

  const revealTextRight = {
    from: {
      x: 140,
      y: 20,
      rotate: 180,
    },
    to: {
      x: 0,
      y: 0,
      rotate: 0,
    },
  };

  const animationController = useAnimation();

  useEffect(() => {
    if (componentInView) {
      animationController.start("to");
    }
  }, [componentInView]);

  return (
    <div ref={inViewRef} className="overflow-hidden">
      <motion.div
        variants={animateType == "left" ? revealTextLeft : revealTextRight}
        initial="from"
        animate={animationController}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default TextMotion;
