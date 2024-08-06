import React from "react";
import Image from "next/image";
import Link from "next/link";

const ServiceCard = ({ name, slug, image, alt }) => {
  return (
    <div className={`service_image relative ${name}`}>
      <Link href={`/explore-experiences/${slug}`}>
        <div className="overlay absolute top-0 left-0"></div>
        {image && (
          <Image
            src={image}
            alt={alt}
            fill
            className="object-cover object-top"
          />
        )}

        <p className="z-10 text-white text-2xl lg:text-4xl 2xl:text-[64px] text-center uppercase font-thin">
          {name}
        </p>
      </Link>
    </div>
  );
};

export default ServiceCard;
