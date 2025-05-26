"use client";
import Image from "next/image";

// import component from shad-cn ui
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const LandingPge = () => {
  return (
    <div className="">
      {/* background image */}
      <Image
        src="/bg-imgs/landing-bg-img1.jpg" // Replace with your actual background image path
        alt="House party background"
        layout="fill"
        objectFit="cover"
        className="z-0 opacity-50" // Adjust opacity as needed
      />
      {/* header section of landing page */}
      <div className="flex flex-col">
        <div>hello</div>
        <div>world</div>
      </div>
    </div>
  );
};

export default LandingPge;
