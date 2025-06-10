"use client";

import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import React, { useState } from "react";
import {
  BackArrow,
  LocationIcon,
  OkayGreenIcon,
  OkayIcon,
  TermsAndConditionsIcon,
} from "../../../../../public/svg-icons/icons";
import InputComponent from "@/components/InputComponent/InputComponent";
import SwitchComponent from "@/components/SwitchComponent/SwitchComponent";
import SliderComponent from "@/components/SliderComponent/SliderComponent";

const page = () => {
  //   loading state
  const [loading, setLoading] = useState(false);
  const [editLocation, setEditLocation] = useState(false);
  return (
    <div>
      {loading && (
        <div className="flex items-center justify-center min-h-screen">
          <LoadingComponent />
        </div>
      )}
      <div className="min-h-screen bg-app-background-primary flex flex-col items-center pt-6 font-sans">
        <div className="w-full max-w-md px-4">
          {/* Header */}
          <header className="flex items-center mb-10">
            <button
              aria-label="Go back"
              onClick={() => window.history.back()} // Simple back navigation
              className="p-2 -ml-2 mr-2" // Added padding for easier click and negative margin to align
            >
              <BackArrow className="text-app-icon" />
            </button>
            <h1 className="text-2xl font-bold text-app-text-primary font-plusJakartaSans">
              Filter
            </h1>
          </header>

          {/* body section */}
          <div className="w-full px-4 ">
            <div className="flex justify-between item-center">
              <h2 className="text-md text-app-text-primary font-plusJakartaSans">
                Current Location
              </h2>
              <h2 className="text-sm text-app-text-yellow font-plusJakartaSans">
                CHANGE
              </h2>
            </div>
            {/* inputs */}
            <div className="mt-2 flex justify-between item-center gap-2">
              <InputComponent placeholder="Country" />
              <InputComponent placeholder="Postal/Zip code" />
            </div>
            <div className="w-1/2 mt-2">
              <InputComponent placeholder="State" />
            </div>
            {/* location */}
            <div className="flex gap-4 mt-4 justify-between">
              <div className="flex gap-2">
                <LocationIcon className="text-app-icon" />
                <p className="text-md text-app-text-primary font-plusJakartaSans">
                  United Kingdom, <br /> 39495, <br />
                  Kentucky
                </p>
              </div>
              <div className="flex gap-2 item-center">
                <button className="bg-app-okay-icon-filter rounded-lg p-2 h-1/2 w-1/2">
                  {editLocation ? (
                    <OkayIcon className="text-app-icon " />
                  ) : (
                    <OkayGreenIcon />
                  )}
                </button>

                <div>
                  <SwitchComponent
                    onclick={() => {
                      setEditLocation(!editLocation);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-sm text-app-text-primary font-plusJakartaSans">
                Distance range (in kilometers)
              </p>
            </div>
            <div className="mt-8">
              <SliderComponent />
            </div>
            <div className="mt-6">
              <p className="text-sm text-app-text-primary font-plusJakartaSans">
                Age range
              </p>
            </div>
            <div className="mt-8">
              <SliderComponent />
            </div>
            {/* footer */}
            <div className="flex justify-between items-center mt-8">
              <p className="text-sm text-app-text-primary font-plusJakartaSans">
                Paid Events
              </p>
              <SwitchComponent onclick={() => {}} />
            </div>
            <div className="pt-4">
              <button
                className="w-full bg-app-button-primary text-app-text-tertiary py-3.5 rounded-lg font-plusJakartaSans text-md"
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
