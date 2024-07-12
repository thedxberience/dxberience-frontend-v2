"use client";
import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import ReactMarkdown from "react-markdown";
import Map from "./MapsApi";

const EventsContentCarousel = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({
    watchDrag: true,
  });

  const onTabClick = useCallback(
    (index) => {
      if (!emblaMainApi) return;
      emblaMainApi.scrollTo(index, true);
      console.log("Scrolling to " + index);
    },
    [emblaMainApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    // emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();

    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  const markdown = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n
  
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n
  
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n
  
  
  ## Features
  
  - Accept Credit Card
  - Age Restriction (21+)
  `;

  const terms_and_conditions = `
  ## BOOKING POLICY

For confirmed bookings, 100% payment will be taken at the time of booking.

## CONFIRMATION POLICY

The customer will receive a confirmation voucher via email within 2 business hours of each successful booking. If the preferred slots are unavailable, an alternate schedule of the customer’s preference will be arranged and a new confirmation voucher will be sent via email. Alternatively, the customer may choose to cancel their booking before confirmation and a full refund will be processed.

## CANCELLATION POLICY

If cancellations are made 1 day before the booking date, then 50% of the total booking cost will be charged as cancellation fees. If cancellations are made on the day of the booking, then the full booking cost will be charged as cancellation fees.

## REFUND POLICY

Cash refunds once initiated, usually take around 5-7 business days to get transferred to the same account through which the payment is made.
`;

  const addressMD = `
Desert Safari Dubai Tours - All UAE Tours, \n
23 Marina Tower \n
Dubai
`;
  return (
    <div>
      <div className="event-tabs py-8 flex justify-center items-center w-full text-xs lg:text-lg">
        <div
          className={`w-4/12 cursor-pointer flex justify-center items-center border-b ${
            selectedIndex == 0 ? "border-black" : "border-gray-50"
          } `}
          onClick={() => onTabClick(0)}
        >
          <h2>Details</h2>
        </div>
        <div
          className={`w-4/12 cursor-pointer flex justify-center items-center border-b ${
            selectedIndex == 1 ? "border-black" : "border-gray-50"
          }`}
          onClick={() => onTabClick(1)}
        >
          <h2>Get Directions</h2>
        </div>
        <div
          className={`w-4/12 cursor-pointer flex justify-center items-center border-b ${
            selectedIndex == 2 ? "border-black" : "border-gray-50"
          }`}
          onClick={() => onTabClick(2)}
        >
          <h2>Terms & Conditions</h2>
        </div>
      </div>
      <div className="tab-content">
        <div className="embla">
          <div className="embla__viewport" ref={emblaMainRef}>
            <div className="embla__container">
              <div className="details md embla__slide" key={1}>
                <ReactMarkdown>{markdown}</ReactMarkdown>
              </div>
              <div className="md embla__slide" key={2}>
                <Map addressMD={addressMD} />
              </div>
              <div className="md embla__slide" key={3}>
                <ReactMarkdown>{terms_and_conditions}</ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsContentCarousel;
