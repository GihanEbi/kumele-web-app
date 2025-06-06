import React from "react";
import {
  BlogHomeIcon,
  EmoryIcon,
  SearchIcon,
  ShearIcon,
} from "../../../../public/svg-icons/icons";
import Image from "next/image";
import HomePageGif from "@/components/GifComponents/HomePageGif/HomePageGif";

const Home = () => {
  return (
    <div className="h-screen bg-app-background-secondary flex flex-col items-center justify-center text-center min-h-[calc(100vh-theme(height.tab-bar)-theme(spacing.safe-bottom)-40px)] relative pt-12">
      {" "}
      {/* 40px approx for main padding */}
      <div className="absolute top-5 left-5 bg-app-background-model rounded-full w-12 h-12 flex items-center justify-center shadow-search-icon">
        <SearchIcon className="text-app-icon"/>
      </div>
      <div className="">
        <HomePageGif/>
        {/* <Image
          src={"/user/man-with-candy.gif"}
          alt="No matches illustration"
          width={200} // Adjust to your illustration's aspect ratio
          height={150} // Adjust
          className="max-w-[80%] h-auto" // Ensure responsiveness
          priority
        /> */}
      </div>
      <h2 className="text-lg font-semibold font-plusJakartaSans text-app-text-primary mb-6 max-w-[250px] leading-tight">
        No more matches currently, until then
      </h2>
      <div className="flex items-center gap-x-8 mb-10">
        {" "}
        {/* gap-x for horizontal spacing */}
        <div className="text-gray-600">
          <EmoryIcon />
        </div>
        <div className="text-gray-600">
          <BlogHomeIcon className="text-app-icon"/>
        </div>
        <div className="text-gray-600">
          <ShearIcon className="text-app-icon"/>
        </div>
      </div>
    </div>
  );
};

export default Home;
