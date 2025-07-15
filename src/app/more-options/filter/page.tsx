"use client";

import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import React, { useState } from "react";
import {
  BackArrow,
  LocationIcon,
  OkayGreenIcon,
  OkayIcon,
  TermsAndConditionsIcon,
} from "../../../../public/svg-icons/icons";
import InputComponent from "@/components/InputComponent/InputComponent";
import SwitchComponent from "@/components/SwitchComponent/SwitchComponent";
import SliderComponent from "@/components/SliderComponent/SliderComponent";
import RadixAgeRangeSlider from "@/components/AgeRangeSlider/AgeRangeSlider";
import { paddings } from "@/constants/layout-constants";
import CustomToggle from "@/components/TogglrButtonComponent/TogglrButton";
import { useRouter } from "next/navigation";

const page = () => {
  //   loading state
  // routing
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [editLocation, setEditLocation] = useState(false);
  const [editEvents, setEditEvents] = useState(false);
  return (
    <div>
      {loading && (
        <div className="flex items-center justify-center min-h-screen">
          <LoadingComponent />
        </div>
      )}
      <div className="min-h-screen bg-app-background-primary flex flex-col items-center pt-6 font-sans">
        <div className={`w-full max-w-md px-6 pt-[36px]`}>
          {/* Header */}
          <header className="flex items-center mb-10">
            <button
              aria-label="Go back"
              onClick={() => window.history.back()} // Simple back navigation
              className="p-2 -ml-2 mr-2" // Added padding for easier click and negative margin to align
            >
              <BackArrow className="text-app-icon" />
            </button>
            <h1 className="ml-5 text-[23px] font-semibold text-app-text-primary font-plusJakartaSans-700">
              Filter
            </h1>
          </header>

          {/* body section */}
          <div className="w-full px-4 ">
            <div className="flex justify-between item-center mb-[20px]">
              <h2 className="text-[16px] text-app-text-primary font-plusJakartaSans-400">
                Current Location
              </h2>
              <h2 className="text-[13px] text-app-text-yellow font-plusJakartaSans-700" onClick={()=>{
                router.push("/user/shop");
              }}>
                CHANGE
              </h2>
            </div>
            {/* inputs */}
            <div className="flex justify-between item-center gap-2">
              <InputComponent placeholder="Country" />
              <InputComponent placeholder="Postal/Zip code" />
            </div>
            <div className="w-1/2 mt-2">
              <InputComponent placeholder="State" />
            </div>
            {/* location */}
            <div className="flex gap-4 mt-[23px] justify-between">
              <div className="flex gap-2">
                <LocationIcon className="text-app-icon" />
                <p className="text-[16px] text-app-text-secondary font-plusJakartaSans-600">
                  United Kingdom, <br /> 39495, <br />
                  Kentucky
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <div className="bg-app-okay-icon-filter rounded-lg p-2 h-1/2 w-1/2">
                  {editLocation ? (
                    <OkayIcon className="text-app-icon " />
                  ) : (
                    <OkayGreenIcon />
                  )}
                </div>

                <div>
                  <CustomToggle
                    checked={editLocation}
                    onCheckedChange={() => setEditLocation(!editLocation)}
                    aria-label="Enable or disable notifications"
                    singleChecked={false}
                  />
                </div>
              </div>
            </div>
            <div className="mt-[76px]">
              <label className="block text-[13.45px] font-plusJakartaSans-400 mb-[54px]">
                Distance range (in kilometers)
              </label>
              {/* Age Range Slider Section using Radix UI */}
              <RadixAgeRangeSlider
                //label="Age range"
                min={0}
                max={100}
                initialValues={[58, 88]} // As shown in your image
                step={1}
                onValueChange={() => {}}
              />
            </div>
            <div className="mt-[34px]">
              <label className="block text-[13.45px] font-plusJakartaSans-400 mb-[54px]">
                Age Range
              </label>
              {/* Age Range Slider Section using Radix UI */}
              <RadixAgeRangeSlider
                //label="Age range"
                min={0}
                max={100}
                initialValues={[18, 28]} // As shown in your image
                step={1}
                onValueChange={() => {}}
              />
            </div>
            {/* footer */}
            <div className="flex justify-between items-center mt-[37px]">
              <p className="text-[13.45px] font-plusJakartaSans-400 text-app-text-primary">
                Paid Events
              </p>
              <CustomToggle
                checked={editEvents}
                onCheckedChange={() => setEditEvents(!editEvents)}
                aria-label="Enable or disable notifications"
                singleChecked={false}
              />
            </div>
            <div className="pt-4 mb-[34px]">
              <button
                className="w-full text-[16px] bg-app-button-primary text-app-text-tertiary font-plusJakartaSans-400 py-3 px-4 rounded-lg"
                onClick={() => {}}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
