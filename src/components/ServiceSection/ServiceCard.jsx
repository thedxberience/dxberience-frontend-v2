import React from "react";
import Image from "next/image";

const ServiceCard = ({ serviceName, image, alt }) => {
  return (
    <div className={`service_image ${serviceName}`}>
      <div className="overlay"></div>
      <Image src={image} alt={alt} fill className="object-cover" />
      <p className="z-10 text-white text-2xl lg:text-[64px] text-center uppercase font-thin">
        {serviceName}
      </p>
    </div>
  );
};

export default ServiceCard;
