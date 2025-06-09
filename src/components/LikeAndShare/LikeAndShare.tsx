// components/LikeAndShare.tsx
"use client";

import { useState } from "react";
import { FaHeart } from 'react-icons/fa';
import {
  LikeIcon,
  BlogFacebookIcon,
  BlogInstagramIcon,
  BlogYoutbeIcon,
  BlogTwitterIcon,
  BlogPinterestIcon,
  ShareIcon,
} from "../../../public/svg-icons/icons";
interface LikeAndShareProps {
  initialLikes: number;
};
import { useTheme } from "next-themes";

export default function LikeAndShare({ initialLikes = 0 }: LikeAndShareProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);

  const { theme, resolvedTheme } = useTheme();

  const isDark = resolvedTheme === "dark";
  console.log("dark cehckinggg",isDark)

  const handleLike = () => {
    setLikes(isLiked ? likes - 1 : likes + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="flex items-center gap-4 mt-2 ">
      <button
        className="flex items-center gap-3 text-app-blog-card-heading  transition-colors"
        onClick={handleLike}
      >
        {isDark ? (<FaHeart
          className={`w-5 h-5 ${isLiked ? "text-white" : "text-gray-500"}`}
        />):(
          <FaHeart
          className={`w-5 h-5 ${isLiked ? "text-black" : "text-gray-500"}`}
        />
        )}

        <span>{likes} Likes</span>
      </button>

      <div className="flex gap-3 ml-4">
        <a href="#" aria-label="Share on Twitter">
          <BlogYoutbeIcon />
        </a>
        <a href="#" aria-label="Share on Facebook">
          <BlogFacebookIcon />
        </a>
        <a href="#" aria-label="Share on LinkedIn">
          <BlogInstagramIcon />
        </a>
        <a href="#" aria-label="Share">
          <BlogPinterestIcon />
        </a>
        <a href="#" aria-label="Share">
          <BlogTwitterIcon />
        </a>
        <a href="#" aria-label="Share">
          <ShareIcon />
        </a>
      </div>
    </div>
  );
}
