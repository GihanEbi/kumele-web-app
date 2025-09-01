"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import React, { useState } from "react";
import {
  BlogFacebookIcon,
  BlogInstagramIcon,
  BlogPinterestIcon,
  BlogTwitterIcon,
  BlogYoutbeIcon,
  CloseIcon,
  Confetti2Icon,
  ShareIcon,
  YingyangIcon,
} from "../../../../../public/svg-icons/icons";
import CheckMarkGif from "@/components/GifComponents/CheckMarkGif/CheckMarkGif";
import HobbyTagIcon from "@/components/HobbyTagIcon/HobbyTagIcon";
import { create_blog } from "@/routes/Blogs APIs";
import SuccessModel from "@/components/Models/SuccessModel/SuccessModel";
import ErrorModel from "@/components/Models/ErrorModel/ErrorModel";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";

type blogForm = {
  event_category_id: string;
  blog_name: string;
  destination: string;
  blog_img_url: any;
  banner_img_url: string;
  blog_video_link: string;
  youtube_link: string;
  facebook_link: string;
  instagram_link: string;
  pinterest_link: string;
  twitter_link: string;
  blog_content: string;
};
interface BlogPreviewModelProps {
  isOpen: boolean;
  onClose: () => void;
  blogData: blogForm;
  tempImgUrl: string | undefined;
  userImg: string | null | undefined;
  userName: string | null | undefined;
  onBlogCreate: Function
}

const BlogPreviewModel = ({
  isOpen,
  onClose,
  blogData,
  tempImgUrl,
  userImg,
  userName,onBlogCreate
}: BlogPreviewModelProps) => {
  const [isBlogCreated, setIsBlogCreated] = React.useState<boolean>(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  if (!isOpen) return null;

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-1010 flex justify-center items-center p-4"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`${
            isBlogCreated && isDark
              ? "bg-neutral-900"
              : isBlogCreated && !isDark
              ? "bg-gray-200"
              : "bg-app-background-tertiary"
          }  rounded-4xl w-full max-w-sm  shadow-lg flex flex-col overflow-y-auto no-scrollbar p-4 sm:p-5`}
        >
          <div className="flex-1p-2 sm:p-5">
            {/* Not scrollable hero image section start */}
            <div className="relative">
              <button
                onClick={onClose}
                className="absolute -top-1 -right-1 z-20 bg-app-background-tertiary p-1"
                aria-label="Close"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
              <Image
                src={tempImgUrl ? tempImgUrl : "/images/blog-preview.png"}
                alt="blog preview"
                width={400}
                height={250}
                className="w-full h-55 object-cover rounded-t-2xl"
              />
              <HobbyTagIcon hobbyId={blogData.event_category_id} />
              {/* <div className="absolute top-5 right-6 bg-app-bg-preview-category-tag-bg text-white text-xs px-3 py-1.5 rounded-full flex items-center space-x-1.5">
                <Confetti2Icon className="w-[15.24px] h-[15.24px]" />
                <span className="font-plusJakartaSans text-white font-normal text-[9.91px]">
                  House Party
                </span>
              </div> */}
            </div>
            {/* Not scrollable hero image section end */}
            <div className="mt-6 overflow-y-auto max-h-58 pr-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <h2 className="font-plusJakartaSans font-bold text-[17.9px] text-app-blog-card-heading">
                {blogData.blog_name}
              </h2>
              <div className="flex flex-row gap-2 mt-4">
                <Image
                  src={userImg ? userImg : "/images/spotify.png"}
                  alt="spotify"
                  width={0}
                  height={0}
                  className="rounded-full w-[18.84px] h-[18.84px] mt-1"
                />{" "}
                <p className="font-plusJakartaSans font-normal text-[12.25px] text-app-blog-card-author-text mt-1">
                  {userName} • {new Date().toLocaleDateString()}
                </p>
              </div>

              <div className="flex gap-3 mt-4 mb-2">
                <a href={blogData.youtube_link} aria-label="Share on Twitter">
                  <BlogYoutbeIcon />
                </a>
                <a href={blogData.facebook_link} aria-label="Share on Facebook">
                  <BlogFacebookIcon />
                </a>
                <a
                  href={blogData.instagram_link}
                  aria-label="Share on LinkedIn"
                >
                  <BlogInstagramIcon />
                </a>
                <a href={blogData.pinterest_link} aria-label="Share">
                  <BlogPinterestIcon />
                </a>
                <a href={blogData.twitter_link} aria-label="Share">
                  <BlogTwitterIcon />
                </a>
                <a href="#" aria-label="Share">
                  <ShareIcon />
                </a>
              </div>
              <div className="flex items-start space-x-2 mb-4">
                <p className="font-plusJakartaSans text-app-button-model-text-color font-normal text-[14.37px] mt-1">
                  {blogData.blog_content && blogData.blog_content}
                </p>
              </div>
            </div>
            <div className="font-plusJakartaSans font-normal text-[14.57px] flex items-center justify-center mt-6">
              <button
                onClick={() => onBlogCreate()}
                className="w-[150.74px] h-[43.72px] bg-app-button-primary text-app-button-text-color py-[6.38px] px-[10.93px] rounded-[8px] transition-colors"
              >
                Create Blog
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* {isBlogCreated && (
        <div
          className="fixed inset-0 bg-opacity-50 flex items-end justify-center z-1030 transition-opacity duration-300 ease-in-out"
          onClick={() => setIsBlogCreated(false)} // Close on click outside
        >
          <div
            className={`bg-app-background-primary w-full max-w-md p-6 sm:p-8 rounded-t-4xl shadow-xl transform transition-transform duration-300 ease-out ${
              isOpen ? "translate-y-0" : "translate-y-full" // Animation handled by presence/absence of component
            }`}
            onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
          >
            <div className="flex flex-col items-center">
              <div className="mb-4">
                <CheckMarkGif />
              </div>
              <p className="text-app-text-primary font-plusJakartaSans font-normal text-[16px] mb-6 text-center">
                Blog Created
              </p>
            </div>
          </div>
        </div>
      )} */}
    </>
  );
};

export default BlogPreviewModel;
