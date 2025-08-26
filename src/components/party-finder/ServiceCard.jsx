"use client";
import React from "react";
import Image from "next/image";
import CustomButton from "@/components/shared/CustomButton";

const ServiceCard = ({ title, description, image, alt, href }) => {
  return (
    <div className="service-card group relative bg-white transition-all duration-300 overflow-hidden">
      {/* Image Container */}
      <div className="relative w-full h-[240px] lg:h-[280px] overflow-hidden">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content Container */}
      <div className="py-4 lg:py-6">
        {/* Title */}
        <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors duration-300">
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-gray-600 text-sm lg:text-base mb-4 line-clamp-2">
            {description}
          </p>
        )}

        {/* CTA Button */}
        <div className="flex justify-between items-center">
          <div className="">
            <CustomButton
              btnName="Book Now"
              isLink
              href={href}
              minWidth={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
