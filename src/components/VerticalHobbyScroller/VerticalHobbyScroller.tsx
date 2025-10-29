import { get_hobbies_list } from "@/routes/permissions_and_hobbies";
import { useTheme } from "next-themes";
import React, { useEffect, useRef, useState } from "react";
import InlineSvg from "../InlineSVG/InlineSVG";
import LoadingComponent from "../LoadingComponent/LoadingComponent";

type ChooseInterestsProps = {
  id: string;
  name: string;
  icon: React.ReactNode;
};

type VerticalHobbyScrollerProps = {
  onChange: Function;
  selectedValue: string;
};

const VerticalHobbyScroller = ({
  onChange,
  selectedValue,
}: VerticalHobbyScrollerProps) => {
  //   loading state
  const [loading, setLoading] = useState(false);
  // state to store advert categories
  const [advertCategories, setAdvertCategories] = useState<
    ChooseInterestsProps[]
  >([]);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<string>(selectedValue);

  //dark theme identification
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  useEffect(() => {
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
              className="w-[35px] h-[35px]"
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

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (tabsContainerRef.current?.offsetLeft || 0));
    setScrollLeft(tabsContainerRef.current?.scrollLeft || 0);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !tabsContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - (tabsContainerRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2; // Scroll speed multiplier
    tabsContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - (tabsContainerRef.current?.offsetLeft || 0));
    setScrollLeft(tabsContainerRef.current?.scrollLeft || 0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !tabsContainerRef.current) return;
    e.preventDefault();
    const x = e.touches[0].pageX - (tabsContainerRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2;
    tabsContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };
  return (
    <div>
      {/* {loading && (
        <div className="flex items-center justify-center min-h-screen">
          <LoadingComponent />
        </div>
      )} */}
      <div className="mb-6 sm:mb-8 relative w-full">
        <div
          ref={tabsContainerRef}
          className="flex space-x-3 overflow-x-auto sm:-mx-0 sm:px-0 no-scrollbar"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            cursor: isDragging ? "grabbing" : "grab",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {advertCategories.map((category: ChooseInterestsProps) => (
            <div
              className={`${
                selectedCategory === category.id
                  ? "bg-k-secondary-color border-none"
                  : "bg-app-background-card hover:bg-app-background"
              }bg-k-secondary-color border-none flex h-24 w-24 rounded-lg`}
            >
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                  onChange(category);
                }}
                className={`
            flex h-24 w-24 flex-col items-center justify-center rounded-lg p-2 text-center transition-all duration-200
            ${
              selectedCategory === category.id
                ? "bg-k-secondary-color border-none"
                : "bg-app-background-card hover:bg-app-background"
            }
          `}
              >
                <div
                  className={`${
                    selectedCategory === category.id && isDark
                      ? "text-gray-900"
                      : ""
                  } mb-1 text-xl`}
                >
                  {category.icon}
                </div>

                <span
                  className={`font-plusJakartaSans font-medium text-[8.39px] ${
                    selectedCategory === category.id && isDark
                      ? "text-black"
                      : "text"
                  } leading-tight`}
                >
                  {category.name}
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VerticalHobbyScroller;
