"use client";

import Image from "next/image";
import { RatingIcon } from "../../../../../../public/svg-icons/icons";
import MedalGif from "@/components/GifComponents/MedalGif/MedalGif";
import { useEffect, useState } from "react";
import { getAllUserData } from "@/routes/profile";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";

type HostInfoProps = {
  host: {
    name: string;
    avatarSrc: string;
    followers: number;
    rating: number;
    level: string;
    levelIcon: string;
    aboutTitle: string;
    aboutBio: string;
  };
};

type fetch_user = {
  id: string;
  profilepicture: string;
  username: string;
  about_me: string;
};

const HostInfo = ({ host }: HostInfoProps) => {
  //   loading state
  const [loading, setLoading] = useState(false);
  // state for user data
  const [userData, setUserData] = useState<fetch_user | null>({
    id: "",
    profilepicture: "",
    username: "",
    about_me: "",
  });
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const data = await getAllUserData();
      if (data.success) {
        setUserData({
          id: data.data.id,
          profilepicture: data.data.profilepicture,
          username: data.data.username,
          about_me: data.data.about_me,
        });
      } else {
        setUserData(null);
      }
    } catch (error) {
      console.error("Error fetching interests:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="relative bg-app-bg-color-modal rounded-2xl p-4 pt-12 mt-10">
      {loading && (
        <div className="flex items-center justify-center min-h-screen">
          <LoadingComponent />
        </div>
      )}
      <div className="absolute -top-12 left-[-3px] flex items-start space-x-3">
        <Image
          src={userData?.profilepicture || ""}
          alt={userData?.username || ""}
          width={88}
          height={88}
          className="relative z-10 rounded-full object-cover flex-shrink-0"
        />
        <div className="flex flex-col items-start space-y-1.5 pt-2">
          <div className="bg-app-blog-selected-tabs-background text-black rounded-lg px-3 py-1.5 shadow-md -ml-7 mt-4 pl-6">
            <p className="font-plusJakartaSans text-black font-semibold text-[12px] leading-tight">
              {host.followers}{" "}
              <span className="font-plusJakartaSans text-black font-semibold text-[12px] leading-tight">
                followers{" "}
              </span>
            </p>
            <div className="flex items-center space-x-1 mt-0.5">
              <RatingIcon />
              <span
                style={{ color: "#464646" }}
                className="font-plusJakartaSans font-medium text-[11px]"
              >
                {host.rating} Overall Ratings
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-grow">
        <div className="flex items-center mb-1">
          <h3 className="font-plusJakartaSans text-app-button-model-text-color font-bold text-[19px]">
            Host
          </h3>

          <div className="ml-3 relative flex items-center">
            {/* <Image
              alt="medal"
              src="/images/medal.png"
              width={19.96}
              height={19.96}
            /> */}
            <MedalGif width={19.96} height={19.96} />
            <div className="absolute -top-4 -right-4 bg-app-blog-selected-tabs-background text-black text-[10.98px] font-extrabold w-[21.95px] h-[21.95px] rounded-full flex items-center justify-center  dark:border-zinc-800">
              {host.levelIcon}
            </div>
          </div>
          <span className="ml-0 mt-2 font-plusJakartaSans text-app-button-model-text-color font-normal text-[13px]">
            {host.level}
          </span>
        </div>

        <div
          className="mt-1 space-y-2 overflow-y-auto max-h-28 pr-4
                        [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          <p className="font-plusJakartaSans text-left text-app-button-model-text-color font-bold text-[13px]">
            About {userData?.username}:{" "}
            <span className="font-plusJakartaSans text-left text-app-button-model-text-color font-normal text-[13px]">
              {userData?.about_me}{" "}
            </span>
          </p>

          <p className="mt-4 text-left font-plusJakartaSans text-app-button-model-text-color font-normal text-[13px]  leading-relaxed">
            {/* {host.aboutBio} */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HostInfo;
