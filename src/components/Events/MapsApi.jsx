"use client";
import React, { useCallback, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

const Map = ({ addressMD, coordinates = null }) => {
  const containerStyle = {
    width: "98%",
    height: "400px",
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const [mapState, setMapState] = useState(null);

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(coordinates);
    // map.fitBounds(bounds);

    setMapState(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMapState(null);
  }, []);

  const handleMapLoad = () => {
    if (coordinates) {
      if (isLoaded) {
        return (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={coordinates}
            zoom={15}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            <Marker position={coordinates} />
          </GoogleMap>
        );
      } else {
        return (
          <div className="animate-spin">
            <Image
              src={"/loader.svg"}
              alt="loader icon"
              width={48}
              height={48}
            />
          </div>
        );
      }
    }
  };

  return (
    <>
      <div>
        <h1>ADDRESS</h1>
        <ReactMarkdown>{addressMD}</ReactMarkdown>
      </div>
      {coordinates && <h1>LOCATION</h1>}
      {handleMapLoad()}
    </>
  );
};

export default Map;
