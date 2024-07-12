"use client";
import React, { useCallback, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

const Map = ({ addressMD }) => {
  const containerStyle = {
    width: "98%",
    height: "400px",
  };

  const center = {
    lat: -3.745,
    lng: -38.523,
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API,
  });

  const [mapState, setMapState] = useState(null);

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMapState(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMapState(null);
  }, []);

  return (
    <>
      <div>
        <h1>ADDRESS</h1>
        <ReactMarkdown>{addressMD}</ReactMarkdown>
      </div>
      <h1>LOCATION</h1>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={11}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          <Marker position={center} />
        </GoogleMap>
      ) : (
        <div className="animate-spin">
          <Image src={"/loader.svg"} alt="loader icon" width={48} height={48} />
        </div>
      )}
    </>
  );
};

export default Map;
