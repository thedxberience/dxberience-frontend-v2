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
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-top"
          />
        )}

        <p className="z-10 text-white text-2xl lg:text-4xl text-center uppercase font-thin">
          {name}
        </p>
      </Link>
    </div>
  );
};

export default ServiceCard;
