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
      <div className="flex flex-row mt-3">
        <div className="flex-1/3 ml-1.5 gap-2">
          <Image
            className="p-2"
            alt="logo"
            src="/images/logo.png"
            width={63}
            height={50}
          />
        </div>
        <div className="flex-2/3 text-2xl font-bold">House Party</div>
      </div>
      {/* avatar section  */}
      <div>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>

      {/* body section */}
      <div>
        <div>body img</div>
        <div>Hobby Meetups</div>
        <div>"Let your Hobbies define your character" -G.Baku</div>
        <div>We play.We overcome. We experience.</div>

        <div className="flex flex-row justify-center">
          <div className="flex-1">
            <Button>Sign in</Button>
          </div>
          <div className="flex-1">
            <Button>Signup</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPge;
