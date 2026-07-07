"use client";

import React, { useState, useRef, useEffect } from "react";

import BlogCard from "@/components/BlogCard/BlogCard";
import { FiSearch } from "react-icons/fi";
import { SearchIcon } from "../../../../public/svg-icons/icons";
import { useAppContext } from "@/context/AppContext";
import { get_all_blogs } from "@/routes/Blogs APIs";

import { get_hobbies_list } from "@/routes/permissions_and_hobbies";
import InlineSvg from "@/components/InlineSVG/InlineSVG";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";

interface BlogCardProps {
  id: string;
  imageUrl: string;
  title: string;
  categoryName: string;
  author: string;
  date: string;
  showIndicator?: boolean;
  tags: string[];
  categoryIcon?: React.ReactNode;
}

type ApiBlog = {
  id: string;
  event_category_id: string;
  blog_name: string;
  banner_img_url: string;
  blog_img_url: string;
  blog_video_link?: string;
  youtube_link?: string;
  facebook_link?: string;
  instagram_link?: string;
  pinterest_link?: string;
  twitter_link?: string;
  blog_content: string;
  author_id: string;
  created_at: string;
};

export type FetchedCategory = {
  id: string;
  name: string;
  icon: React.ReactNode;
};

const Blog: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [blogs, setBlogs] = useState<BlogCardProps[]>([]);
  const [categories, setCategories] = useState<FetchedCategory[]>([]);
  const [error, setError] = useState<string | null>(null);

  // use the appContext to get the more option state
  const { moreOption, setIsBottomNavBarFixed } = useAppContext();
  const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const filteredPosts = blogs.filter((post) => {
    const matchesTab = activeTab === "all" || post.tags.includes(activeTab);
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.categoryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });
  useEffect(() => {
    setIsBottomNavBarFixed(true);
    const categoryData = async () => {
      await fetchCategories();
    };

    categoryData();
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      const categoryMap: Record<string, FetchedCategory> = {};
      categories.forEach((cat) => {
        categoryMap[cat.id] = cat;
      });

      fetchBlogs(categoryMap);
    }
  }, [categories]);

  //git version testing
  //testing codess  

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

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await get_hobbies_list();
      const mapped: FetchedCategory[] = (res?.data ?? []).map((item: any) => ({
        id: item.id,
        name: item.name,
        icon: (
          <InlineSvg
            svg={item.svg_code}
            title={item.name}
            className="w-[16.18px] h-[16.18px]"
          />
        ),
      }));
      setCategories([{ id: "all", name: "All", icon: null }, ...mapped]);
      console.log("Fetched categories:", mapped);
    } catch (error) {
      console.error("Error fetching interests:", error);
    } finally {
      setLoading(false);
    }
  };

  const mapApiToCard = (
    apiBlog: ApiBlog,
    categoryMap: Record<string, FetchedCategory>
  ): BlogCardProps => {
    const category = categoryMap[apiBlog.event_category_id] || {
      name: "Unknown",
      icon: null,
    };
    return {
      id: apiBlog.id,
      imageUrl: apiBlog.blog_img_url,
      title: apiBlog.blog_name,
      categoryName: category.name,
      categoryIcon: category.icon,
      author: apiBlog.author_id,
      date: new Date(apiBlog.created_at).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
      tags: ["all", apiBlog.event_category_id],
    };
  };

  const fetchBlogs = async (categoryMap: Record<string, FetchedCategory>) => {
    setLoading(true);
    setError(null);
    try {
      const res = await get_all_blogs();
      if (res?.success && Array.isArray(res.data)) {
        const mapped = (res.data as ApiBlog[]).map((blog) =>
          mapApiToCard(blog, categoryMap)
        );
        setBlogs(mapped);
        console.log("Fetched blogs:", mapped);
      } else {
        setBlogs([]);
        setError("No blogs found.");
      }
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError("Failed to load blogs.");
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`max-w-full h-screen mx-auto rounded-lg pt-[64px] pb-50 ${
        moreOption ? "bg-k-background-secondary" : "bg-k-background-primary"
      }`}
    >
      {loading && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <LoadingComponent />
        </div>
      )}
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 ">
        <h2 className="font-plusJakartaSans  font-bold text-[23px] mb-6">
          Blog
        </h2>
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
            className="block w-full pl-10 pr-3 py-3 bg-app-search-bar-background border border-transparent rounded-lg focus:ring-yellow-500 focus:border-yellow-500 text-text-body placeholder-app-search-bar-text placeholder-font-plusJakartaSans placeholder:font-normal placeholder:text-[16px]"
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
            {categories.map((tab) => (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                onClick={() => handleTabClick(tab.id)}
                className={`py-2 px-5 rounded-full font-plusJakartaSans font-normal text-[13px] whitespace-nowrap flex-shrink-0 transition-colors duration-150
                  ${
                    activeTab === tab.id
                      ? "bg-app-blog-selected-tabs-background text-app-blog-selected-tabs-text"
                      : "bg-app-blog-unselected-tabs-background text-app-blog-unselected-tabs-text hover:bg-gray-700"
                  } `}
              >
                {tab.name}
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
