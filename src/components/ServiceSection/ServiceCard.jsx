import React from "react";
import Image from "next/image";
import Link from "next/link";

const ServiceCard = ({ serviceName, image, alt }) => {
  return (
    <div className={`service_image relative ${serviceName}`}>
      <Link href={"/explore-experiences"}>
        <div className="overlay absolute top-0 left-0"></div>
        <Image src={image} alt={alt} fill className="object-cover" />
        <p className="z-10 text-white text-2xl lg:text-4xl 2xl:text-[64px] text-center uppercase font-thin">
          {serviceName}
        </p>
      </Link>
    </div>
  );
};

export default ServiceCard;
