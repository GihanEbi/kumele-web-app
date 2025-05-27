"use client";
import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  AboutUsIcon,
  AndroidAppIcon,
  BlogIcon,
  ContactUsIcon,
  FacebookIcon,
  GuidelineIcon,
  InstagramIcon,
  IosAppIcon,
  LandingPageIcon1,
  PartnershipIcon,
  PinterestIcon,
  TwitterIcon,
  YoutubeIcon,
} from "../../../public/svg-icons/icons";

// Helper component for the multi-colored "Hobbies" text
const MultiColorText = ({
  text,
  colors,
}: {
  text: string;
  colors: string[];
}) => {
  return (
    <span className="font-bold">
      {text.split("").map((char, index) => (
        <span key={index} style={{ color: colors[index % colors.length] }}>
          {char}
        </span>
      ))}
    </span>
  );
};

const footerNavItems = [
  { icon: <AboutUsIcon />, label: "About us" },
  { icon: <ContactUsIcon />, label: "Contact" },
  { icon: <PartnershipIcon />, label: "Partnership" },
  { icon: <BlogIcon />, label: "Blog" }, // Changed from Blog icon as FileText is more common
  { icon: <GuidelineIcon />, label: "Guideline" }, // Changed from list icon
  { icon: <AndroidAppIcon />, label: "Android app" },
  { icon: <IosAppIcon />, label: "iOS" },
];

const socialIcons = [
  { icon: <YoutubeIcon />, label: "YouTube" },
  { icon: <FacebookIcon />, label: "Facebook" },
  { icon: <InstagramIcon />, label: "Instagram" },
  { icon: <PinterestIcon />, label: "Pinterest" },
  { icon: <TwitterIcon />, label: "Twitter" },
];

const LandingPge = () => {
  const router = useRouter();
  // make state for the carousel to set the background img index
  const [carouselIndex, setCarouselIndex] = React.useState(0);
  // mock data for avatars
  // should be replaced with actual user data
  const profilePics = [
    {
      name: "James",
      src: "/avatar-img/avatar-1.jpg",
      borderColor: "border-yellow-400",
    },
    {
      name: "Jermy",
      src: "/avatar-img/avatar-2.jpg",
      borderColor: "border-blue-500",
    },
    {
      name: "Linda",
      src: "/avatar-img/avatar-3.png",
      borderColor: "border-blue-500",
    },
    {
      name: "Olivia",
      src: "/avatar-img/avatar-4.jpg",
      borderColor: "border-blue-500",
    },
  ];

  // background image data for landing page
  const backgroundImageData = [
    {
      id: 1,
      name: "House Party",
      src: "/bg-imgs/landing-bg-img1.jpg",
    },
    {
      id: 2,
      name: "Family Activities",
      src: "/bg-imgs/landing-bg-img2.jpg",
    },
    {
      id: 3,
      name: "Spirituality",
      src: "/bg-imgs/landing-bg-img3.jpg",
    },
    {
      id: 4,
      name: "Sports",
      src: "/bg-imgs/landing-bg-img4.jpg",
    },
    {
      id: 5,
      name: "Volunteers",
      src: "/bg-imgs/landing-bg-img5.jpg",
    },
  ];

  // colors for hobbies text
  const hobbyColors = [
    "#FF0000",
    "#FF9900",
    "#FFF500",
    "#00FF1A",
    "#0047FF",
    "#EB07FF",
    "#FF1485",
  ];

  const totalSlides = 5;
  // Auto-play carousel every 5 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  const touchStartX = React.useRef<number | null>(null);
  const touchEndX = React.useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    handleSwipeGesture();
  };

  const handleSwipeGesture = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const deltaX = touchStartX.current - touchEndX.current;
      if (Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          // Swipe left
          setCarouselIndex((prev) => (prev + 1) % totalSlides);
        } else {
          // Swipe right
          setCarouselIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
        }
      }
    }
    // Reset
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white flex flex-col justify-between"
      style={{
        backgroundImage: `url(${backgroundImageData[carouselIndex].src})`,
      }} // Replace with your actual background
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Overlay to darken the background image a bit */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      {/* Main Content - make it scrollable if content exceeds screen height */}
      <main className="relative z-10 flex-grow flex flex-col items-center pt-6 overflow-y-auto">
        {/* Header Section */}
        <header className="w-full items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image
              className="p-2"
              alt="logo"
              src="/images/logo.png"
              width={63}
              height={50}
            />
            <h1 className="text-3xl font-bold">
              {backgroundImageData[carouselIndex].name}
            </h1>
          </div>
          <div className="flex items-center">
            <div className="flex -space-x-3">
              {profilePics.slice(0, 4).map((pic, index) => (
                <div
                  key={pic.name}
                  className={`relative w-12 h-12 rounded-full ${pic.borderColor} border-2 overflow-hidden`}
                >
                  <div className="flex flex-row">
                    <div>
                      <Image
                        src={pic.src}
                        alt={pic.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full"
                      />
                    </div>
                    <div className="">{pic.name}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white text-black text-xs px-2 py-1 rounded-full flex items-center font-semibold">
              +20 Guest <LandingPageIcon1 />
            </div>
          </div>
        </header>

        {/* Hobby Meetups Section */}
        <section className="flex flex-col items-center mt-8">
          <Image
            className="p-2"
            alt="logo"
            src="/images/landing-page-body -img.png"
            width={145}
            height={145}
          />
          <p className=" text-lg font-normal">Hobby Meetups</p>
        </section>

        {/* Quote Section */}
        <section className="text-center max-w-md">
          <p className="font-bold">
            “Let your <MultiColorText text="Hobbies" colors={hobbyColors} />{" "}
            define your character”
          </p>
          <p className="text-sm text-gray-300 mt-1">- G. Baku</p>
        </section>

        {/* Slogan Section */}
        <p className="text-center text-md my-4">
          We play. We overcome. We experience.
        </p>

        {/* Auth Buttons Section */}
        <section className="w-full max-w-sm">
          <div className="flex rounded-full overflow-hidden border-yellow-500 shadow-md">
            <button
              className="flex-1 bg-yellow-500 text-black py-3 text-center font-semibold hover:bg-yellow-400 transition-colors"
              onClick={() => router.push("/authentication/signin")}
            >
              Sign in
            </button>
            <button
              className="flex-1 bg-blue-600 text-white py-3 text-center font-semibold hover:bg-blue-500 transition-colors"
              onClick={() => router.push("/authentication/signup")}
            >
              Signup
            </button>
          </div>
        </section>

        {/* Carousel Dots */}
        <div className="flex justify-center space-x-2 my-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full ${
                i === carouselIndex ? "bg-yellow-500 scale-110" : "bg-white/40"
              } transition-all`}
              onClick={() => setCarouselIndex(i)}
              style={{ cursor: "pointer" }}
            ></div>
          ))}
        </div>
      </main>

      {/* Footer Navigation Section (sticky or at bottom) */}
      <footer className="relative z-10 w-full">
        <div className="grid grid-cols-7 sm:grid-cols-7 text-center text-xs mb-5">
          {footerNavItems.map((item) => (
            <a key={item.label} href="#" className="flex flex-col items-center">
              <div className="">{item.icon}</div>
              <span className="text-xs">{item.label}</span>
            </a>
          ))}
        </div>

        {/* Social Links Section */}
        <div className="flex justify-center pb-3">
          {socialIcons.map((social) => (
            <a
              key={social.label}
              href="#"
              aria-label={social.label}
              className=""
            >
              <div className="p-2">{social.icon}</div>
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default LandingPge;
