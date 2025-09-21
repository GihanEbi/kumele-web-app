"use client";

import React, { useEffect, useState } from "react";
import { Confetti2Icon } from "../../../public/svg-icons/icons";
import InlineSvg from "../InlineSVG/InlineSVG";
import { get_hobbies_list } from "@/routes/permissions_and_hobbies";
import LoadingComponent from "../LoadingComponent/LoadingComponent";

type HobbyProps = {
  hobbyId: string;
  isNormalComponent?: boolean;
};

type ChooseInterestsProps = {
  id: string;
  name: string;
  icon: React.ReactNode;
};

const HobbyTagIcon = ({ hobbyId, isNormalComponent }: HobbyProps) => {
  //   loading state
  const [loading, setLoading] = useState(false);
  // state to store advert categories
  const [advertCategories, setAdvertCategories] = useState<
    ChooseInterestsProps[]
  >([]);
  useEffect(() => {
    console.log(hobbyId);

    fetchInterests();
  }, []);

  const fetchInterests = async () => {
    setLoading(true);
    try {
      const res = await get_hobbies_list();
      const mapped: ChooseInterestsProps[] = (res?.data ?? []).map(
        (item: any) => ({
          id: item.id,
          name: item.name,
          icon: item.svg_code && (
            <InlineSvg
              svg={item.svg_code}
              className="w-[15.24px] h-[15.24px]"
              title={item.name}
            />
          ),
        })
      );

      setAdvertCategories(mapped);
    } catch (error) {
      console.error("Error fetching interests:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={` ${
        isNormalComponent
          ? "bg-app-bg-preview-category-tag-bg text-white text-xs px-3 py-1.5 rounded-full flex items-center space-x-1.5"
          : "absolute top-5 right-6 bg-app-bg-preview-category-tag-bg text-white text-xs px-3 py-1.5 rounded-full flex items-center space-x-1.5"
      } `}
    >
      {/* {loading && (
        <div className="flex items-center justify-center min-h-screen">
          <LoadingComponent />
        </div>
      )} */}
      {advertCategories.map((item) =>
        item.id === hobbyId ? (
          <div key={item.id} className="flex items-center space-x-1">
            {item.icon}
            <span className="font-plusJakartaSans text-white font-normal text-[9.91px]">
              {item.name}
            </span>
          </div>
        ) : null
      )}
    </div>
  );
};

export default HobbyTagIcon;
