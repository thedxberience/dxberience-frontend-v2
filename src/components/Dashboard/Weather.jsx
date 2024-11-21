import Image from "next/image";
import React from "react";

const Weather = () => {
  return (
    <div className="absolute -bottom-10 left-0 hidden lg:flex flex-center weather-container w-[66.042vw] h-[290px]">
      <div className="text-white flex-between justify-around w-5/12">
        <div className="weather-num ">
          <div>
            <h1 className="text-7xl font-IvyPresto">39&deg;</h1>
            <div className="flex-center text-center">
              <p>Sunny</p>
              <p>27&deg; | 41&deg;</p>
            </div>
          </div>
          <div className="flex flex-col justify-start items-start gap-2">
            <p>Real Feel 43&deg;</p>
            <p>Humidity 35&deg;</p>
            <p>Rain Risk 35&deg;</p>
          </div>
        </div>
        <div>
          <div className="weather-location w-full flex-center flex-col gap-4">
            <div className="w-full flex flex-col gap-1 justify-end items-end text-right pr-4">
              <h3 className="text-xl">Dubai</h3>
              <p className="w-full font-light text-sm">
                TODAY, MONDAY 27, 2024
              </p>
            </div>
            <div className="flex-center w-full">
              <Image
                src={"/sun.png"}
                alt="sunny"
                width={90.48}
                height={90.48}
              />
            </div>
            <div>
              <p>Sunrise 6:47am</p>
              <p>Sunset 7:15pm</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[1px] h-5/6 bg-white"></div>
      <div className="weather-forecast flex-center w-7/12 text-white">
        <div className="w-10/12 flex-between">
          {Array.from([1, 2, 3, 4, 5]).map((item) => (
            <div key={item} className="flex-center flex-col gap-2">
              <p className="uppercase">THU 28</p>
              <Image src={"/sun.png"} alt="sunny" width={46} height={46} />
              <p>27&deg; | 41&deg;</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Weather;
