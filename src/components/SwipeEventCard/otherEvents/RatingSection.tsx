import type { NextPage } from "next";
import React from "react";
import { Confetti2Icon } from "../../../../public/svg-icons/icons";

function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g id="Component 32">
        <path
          id="Vector"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.11173 1.84809C7.28118 1.52912 7.61277 1.3291 7.97427 1.3291C8.33576 1.3291 8.66736 1.52912 8.83681 1.84809L10.4735 4.93476C10.4921 4.97065 10.5194 5.00121 10.5519 5.02514C10.5845 5.04906 10.6224 5.06501 10.6622 5.07165L14.1031 5.67437C14.4593 5.73683 14.751 5.99068 14.8633 6.33423C14.9749 6.67779 14.8879 7.05523 14.636 7.31506L12.2066 9.82559C12.1787 9.85483 12.1574 9.89005 12.1448 9.92793C12.1321 9.96647 12.1288 10.007 12.1341 10.0475L12.6239 13.5063C12.6744 13.8639 12.5235 14.2207 12.2312 14.4333C11.9388 14.646 11.5533 14.6792 11.2284 14.5204L8.09056 12.9854C8.05467 12.9674 8.0148 12.9581 7.97427 12.9581C7.93373 12.9581 7.89386 12.9674 7.85731 12.9847L4.71947 14.5197C4.39452 14.6786 4.0091 14.6447 3.71672 14.4327C3.42433 14.22 3.27349 13.8639 3.32399 13.5057L3.81374 10.0469C3.81972 10.007 3.81573 9.96581 3.8031 9.92727C3.79048 9.88872 3.76988 9.85351 3.74131 9.82493L1.31184 7.31439C1.06065 7.05457 0.972934 6.67712 1.08457 6.33357C1.19621 5.99001 1.4886 5.73617 1.84478 5.6737L5.28564 5.07099C5.32551 5.06368 5.36339 5.04773 5.39595 5.02447C5.42851 5.00055 5.45575 4.96998 5.47436 4.9341L7.11173 1.84809Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}

const RatingSection: NextPage = () => {
  const rating = 3.6;
  const totalStars = 5;
  const ratingData = [
    { label: "5 Star", percentage: 60 },
    { label: "4 Star", percentage: 19 },
    { label: "3 Star", percentage: 0 },
    { label: "2 Star", percentage: 0 },
    { label: "1 Star", percentage: 30 },
  ];

  const renderStars = () => {
    const fullStars = Math.floor(rating);
    const partialStarPercentage = Math.round((rating - fullStars) * 100);
    const emptyStars =
      totalStars - fullStars - (partialStarPercentage > 0 ? 1 : 0);

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <StarIcon
          key={`full-${i}`}
          className="w-[15.95px] h-[15.95px] text-black dark:text-white"
        />
      );
    }

    if (partialStarPercentage > 0) {
      const clipId = `clip-star-${Math.random().toString(36).substring(7)}`;
      stars.push(
        <div key="partial" className="relative w-[15.95px] h-[15.95px]">
          <svg className="w-full h-full absolute" viewBox="0 0 16 16">
            <defs>
              <clipPath id={clipId}>
                <rect
                  x="0"
                  y="0"
                  width={`${(16 * partialStarPercentage) / 100}`}
                  height="16"
                />
              </clipPath>
            </defs>
          </svg>
          <StarIcon className="text-gray-400 absolute" />
          <div style={{ clipPath: `url(#${clipId})` }}>
            <StarIcon className="text-black dark:text-white absolute" />
          </div>
        </div>
      );
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <StarIcon
          key={`empty-${i}`}
          className="w-[15.95px] h-[15.95px] text-gray-400"
        />
      );
    }

    return stars;
  };

  return (
    <section className="rounded-lg w-full py-6">
      <header className="flex flex-row gap-3 mb-3">
        <h1
          className="font-plusJakartaSans font-bold text-[18.54px]"
          style={{ color: "#004DFF" }}
        >
          90's Hip-Hop
        </h1>
        <div className="bg-gray-800 text-white text-xs px-3 py-1 rounded-full flex items-center space-x-2 w-[136px] h-[28px]">
          <Confetti2Icon className="w-[20px] h-[20px]" />
          <span className="font-plusJakartaSans text-white font-normal text-[13px]">
            House Party
          </span>
        </div>
      </header>

      <div className="mb-4 flex flex-col items-start">
        <div className="flex items-center">{renderStars()}</div>
        <p className="font-plusJakartaSans font-normal text-[17px] mt-2">
          {rating} out of 5
        </p>
        <p className="font-plusJakartaSans font-semibold text-[16px] mt-1">
          6 Guest ratings
        </p>
      </div>

      <div className="space-y-1 -ml-3">
        {ratingData.map((data) => (
          <div key={data.label} className="flex items-center text-base">
            <span className={`font-plusJakartaSans font-semibold text-[15px] w-16 shrink-0 ${data.percentage===0?"text-gray-500":""}`}>
              {data.label}
            </span>
            <div style={{backgroundColor:"#A6A6A6"}} className="w-full rounded-r-full h-3.5 mx-1">
              <div
                className="bg-black dark:bg-white h-3.5"
                style={{ width: `${data.percentage}%` }}
              ></div>
            </div>
            <span className={`${data.percentage===0?"text-gray-500":""} font-plusJakartaSans font-semibold text-[15px] w-12 text-right shrink-0`}>{`${data.percentage}%`}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RatingSection;
