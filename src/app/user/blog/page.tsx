"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import BlogCard from "@/components/BlogCard/BlogCard";
import { FiSearch } from "react-icons/fi";
import { SearchIcon } from "../../../../public/svg-icons/icons";

interface BlogCardProps {
  id: string;
  imageUrl: string;
  title: string;
  categoryName: string;
  author: string;
  date: string;
  showIndicator?: boolean;
  tags: string[];
}

const TABS = [
  { id: "all", label: "All" },
  { id: "pubs-bars", label: "Pubs & Bars" },
  { id: "video-games", label: "Video Games" },
  { id: "sports", label: "Sports" },
  { id: "music", label: "Music" },
  { id: "travel", label: "Travel" },
];

const ALL_BLOG_POSTS: BlogCardProps[] = [
  {
    id: "1",
    imageUrl: "/images/blog-demo.jpg",
    title: "Singleton of Glen Ord 38-year old and the Singleton range.",
    categoryName: "House Party",
    author: "Steve Austin",
    date: "23 August, 2022",
    showIndicator: true,
    tags: ["all", "pubs-bars", "house-party"],
  },
  {
    id: "2",
    imageUrl: "/images/blog-demo.jpg",
    title: "Exploring the latest indie video game hits of the year.",
    categoryName: "Video Games",
    author: "Jane Doe",
    date: "15 September, 2022",
    tags: ["all", "video-games"],
  },
  {
    id: "3",
    imageUrl: "/images/blog-demo.jpg",
    title: "Top 5 Sports Moments You Might Have Missed This Month.",
    categoryName: "Sports Highlights",
    author: "John Smith",
    date: "02 October, 2022",
    tags: ["all", "sports"],
  },
  {
    id: "4",
    imageUrl: "/images/blog-demo.jpg",
    title: "A guide to the best craft beer pubs in downtown.",
    categoryName: "Pubs & Bars",
    author: "Alice Brown",
    date: "28 August, 2022",
    tags: ["all", "pubs-bars"],
  },
  {
    id: "5",
    imageUrl: "/images/blog-demo.jpg",
    title: "Upcoming AAA Video Game Releases for Q4.",
    categoryName: "Gaming News",
    author: "Mike Lee",
    date: "10 September, 2022",
    tags: ["all", "video-games"],
  },
  {
    id: "6",
    imageUrl: "/images/blog-demo.jpg",
    title: "Music Festivals to Look Forward To Next Summer.",
    categoryName: "Music",
    author: "Clara Ray",
    date: "11 November, 2022",
    tags: ["all", "music"],
  },
  {
    id: "7",
    imageUrl: "/images/blog-demo.jpg",
    title: "Backpacking Through Southeast Asia: A Travelogue.",
    categoryName: "Travel",
    author: "Derek Green",
    date: "05 December, 2022",
    tags: ["all", "travel"],
  },
];

const Blog: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const filteredPosts = ALL_BLOG_POSTS.filter((post) => {
    const matchesTab = activeTab === "all" || post.tags.includes(activeTab);
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.categoryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Mobile-like drag scrolling handlers
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

  const scrollToTab = (tabId: string) => {
    const tabElement = document.getElementById(`tab-${tabId}`);
    if (tabElement && tabsContainerRef.current) {
      const container = tabsContainerRef.current;
      const containerWidth = container.offsetWidth;
      const tabLeft = tabElement.offsetLeft;
      const tabWidth = tabElement.offsetWidth;

      const scrollPosition = tabLeft - (containerWidth - tabWidth) / 2;

      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    scrollToTab(tabId);
  };

  return (
    <div className="max-w-full mx-auto rounded-lg bg-app-background-primary">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <h2 className="text-heading text-  mb-6">Blog</h2>
        {/* Search Bar */}
        <div className="relative mb-6 sm:mb-8 w-full md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto sm:mx-0">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {/* Search icon*/}
            <div className="text-app-search-bar-icon">
              <SearchIcon />
            </div>
          </div>
          <input
            type="search"
            name="search"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 bg-app-search-bar-background border border-transparent rounded-lg focus:ring-yellow-500 focus:border-yellow-500 text-text-body placeholder-app-search-bar-text"
            placeholder="Search"
          />
        </div>

        {/* Mobile-style scrollable tabs (no visible scrollbar) */}
        <div className="mb-6 sm:mb-8 relative">
          <div
            ref={tabsContainerRef}
            className="flex space-x-3 overflow-x-auto pb-2 no-scrollbar"
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
            {TABS.map((tab) => (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                onClick={() => handleTabClick(tab.id)}
                className={`py-2 px-5 rounded-full text-text-caption  whitespace-nowrap flex-shrink-0 transition-colors duration-150
                  ${
                    activeTab === tab.id
                      ? "bg-app-blog-selected-tabs-background text-app-blog-selected-tabs-text"
                      : "bg-app-blog-unselected-tabs-background text-app-blog-unselected-tabs-text hover:bg-gray-700"
                  } `}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} {...post} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8 col-span-full">
            No posts found matching your criteria.
          </p>
        )}
      </div>
    </div>
  );
};

export default Blog;
