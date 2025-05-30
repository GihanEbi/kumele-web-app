import React from "react";
import {
  BlogHomeIcon,
  EmoryIcon,
  SearchIcon,
  ShearIcon,
} from "../../../../public/svg-icons/icons";
import Image from "next/image";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-300 flex flex-col items-center justify-center text-center min-h-[calc(100vh-theme(height.tab-bar)-theme(spacing.safe-bottom)-40px)] relative pt-12">
      {" "}
      {/* 40px approx for main padding */}
      <div className="absolute top-5 left-5 bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-search-icon">
        <SearchIcon />
      </div>
      <div className="mb-8">
        <Image
          src={"/user/man-with-candy.gif"}
          alt="No matches illustration"
          width={200} // Adjust to your illustration's aspect ratio
          height={150} // Adjust
          className="max-w-[80%] h-auto" // Ensure responsiveness
          priority
        />
      </div>
      <h2 className="text-lg font-semibold text-gray-800 mb-6 max-w-[250px] leading-tight">
        No more matches currently, until then
      </h2>
      <div className="flex items-center gap-x-8">
        {" "}
        {/* gap-x for horizontal spacing */}
        <div className="text-gray-600">
          <EmoryIcon />
        </div>
        <div className="text-gray-600">
          <BlogHomeIcon />
        </div>
        <div className="text-gray-600">
          <ShearIcon />
        </div>
      </div>
    </div>
  );
};

export default Home;
