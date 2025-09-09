"use client";

import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import {
  BlogFacebookIcon,
  BlogInstagramIcon,
  BlogYoutbeIcon,
  BlogTwitterIcon,
  BlogPinterestIcon,
  ShareIcon,
} from "../../../public/svg-icons/icons";
interface LikeAndShareProps {
  initialLikes: number;
  blogId?: string;
  initiallyLiked?: boolean;
  youtube_link?: string;
  facebook_link?: string;
  instagram_link?: string;
  pinterest_link?: string;
  twitter_link?: string;
}
import { useTheme } from "next-themes";
import { like_blog, unlike_blog } from "@/routes/Blogs APIs";

export default function LikeAndShare({
  blogId,
  initiallyLiked = false,
  initialLikes = 0,
  youtube_link,
  facebook_link,
  instagram_link,
  pinterest_link,
  twitter_link,
}: LikeAndShareProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState<boolean>(initiallyLiked);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const {  resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  console.log("dark cehckinggg", isDark);

  const handleLike = () => {
    setLikes(isLiked ? likes - 1 : likes + 1);
    setIsLiked(!isLiked);
  };

  const handleToggleLike = async () => {
    console.log("isliked", isLiked);
    if (!blogId) return;
    try {
      let res;
      if (isLiked) {
        res = await unlike_blog(blogId);
        if (res.success) {
          setIsLiked(false);
          setMessage("Blog unliked");
          setLikes((prev) => (prev > 0 ? prev - 1 : 0));
        }
      } else {
        res = await like_blog(blogId);
        if (res.success) {
          setIsLiked(true);
          setMessage("Blog liked");
          setLikes((prev) => prev + 1);
        }
      }
    } catch (err) {
      console.error("Error:", err);
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-4 mt-2 ">
      <button
        className="flex items-center gap-3 text-app-blog-card-heading  transition-colors"
        onClick={handleToggleLike}
      >
        {isDark ? (
          <FaHeart
            className={`w-5 h-5 ${isLiked ? "text-white" : "text-gray-500"}`}
          />
        ) : (
          <FaHeart
            className={`w-5 h-5 ${isLiked ? "text-black" : "text-gray-500"}`}
          />
        )}

        <span>{likes} Likes</span>
      </button>

      <div className="flex gap-3 ml-4">
        {youtube_link && (
          <a
            href={youtube_link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on YouTube"
          >
            <BlogYoutbeIcon />
          </a>
        )}
        {facebook_link && (
          <a
            href={facebook_link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on Facebook"
          >
            <BlogFacebookIcon />
          </a>
        )}
        {instagram_link && (
          <a
            href={instagram_link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on Instagram"
          >
            <BlogInstagramIcon />
          </a>
        )}
        {pinterest_link && (
          <a
            href={pinterest_link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on Pinterest"
          >
            <BlogPinterestIcon />
          </a>
        )}
        {twitter_link && (
          <a
            href={twitter_link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on Twitter"
          >
            <BlogTwitterIcon />
          </a>
        )}
        <a href="#" aria-label="Share">
          <ShareIcon />
        </a>
      </div>
    </div>
  );
}
