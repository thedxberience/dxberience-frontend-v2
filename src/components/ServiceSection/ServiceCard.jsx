"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ServiceCard = ({ name, slug, image, alt }) => {
  const pathname = usePathname();

  const handleServiceCardRoute = () => {
    const routeToCategoryPageRoutes = ["/about"];

    if (routeToCategoryPageRoutes.includes(pathname)) {
      return `/explore-experiences/${slug}`;
    } else {
      return `/explore-experiences/${slug}/all`;
    }
  };

  return (
    <div className={`service_image relative ${name}`}>
      <Link href={handleServiceCardRoute()}>
        <div className="overlay absolute top-0 left-0"></div>
        {image && (
          <Image
            src={image}
            alt={alt ?? name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-top"
          />
        )}

        <h3 className="z-10 text-white text-2xl lg:text-4xl text-center uppercase font-thin">
          {name}
        </h3>
      </Link>
    </div>
  );
};

export default ServiceCard;
