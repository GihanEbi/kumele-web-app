"use client";
import Image from "next/image";
import { Comment } from "@/types/blog";
import LikeAndShare from "@/components/LikeAndShare/LikeAndShare";
import CommentForm from "@/components/CommentForm/CommentForm";

import CommentList from "@/components/CommentList/CommentList";
import { useCallback, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useParams } from "next/navigation";
import { Confetti2Icon } from "../../../../../public/svg-icons/icons";
import {
  comment_on_blog,
  get_blog_by_id,
  get_blog_comments,
  like_blog,
  unlike_blog,
} from "@/routes/Blogs APIs";
import InlineSvg from "@/components/InlineSVG/InlineSVG";
import { FetchedCategory } from "../page";
import { get_hobbies_list } from "@/routes/permissions_and_hobbies";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import { set } from "date-fns";

const MockComments: Comment[] = [
  {
    id: 1,
    author: "Josh Durrant",
    date: "25 April 2022",
    content:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    isOwner: true,
    avatarUrl: "/avatar-img/joshdurrant.png",
    replies: [
      {
        id: 101,
        author: "Alkesh Sharma",
        date: "23 August 2022",
        content: "What a display dsn cdn zxnc",
        avatarUrl: "/avatar-img/user-preview.png",
        replies: [
          {
            id: 103,
            author: "Josh Durrant",
            date: "23 August 2022",
            content: "I also agree with this assessment.",
            avatarUrl: "/avatar-img/joshdurrant.png",
          },
          {
            id: 104,
            author: "Simon Pears",
            date: "23 August 2022",
            content: "I also agree with this assessment.",
            avatarUrl: "/avatar-img/simon.png",
          },
        ],
      },
      {
        id: 102,
        author: "Josh Durrant",
        date: "23 August 2022",
        content: "Replying to Alkesh, great point!",
        isOwner: true,
        avatarUrl: "/avatar-img/joshdurrant.png",
      },
      {
        id: 103,
        author: "Simon Pears",
        date: "23 August 2022",
        content: "I also agree with this assessment.",
        avatarUrl: "/avatar-img/simon.png",
      },
    ],
  },
  {
    id: 2,
    author: "Jakob Hoffman",
    date: "23 August 2022",
    content:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    avatarUrl: "/avatar-img/jakob.png",
    replies: [
      {
        id: 101,
        author: "Alkesh Sharma",
        date: "23 August 2022",
        content: "What a display dsn cdn zxnc",
        avatarUrl: "/avatar-img/user-preview.png", // Use different avatar for clarity
      },
    ],
  },
];

type LikeButtonProps = {
  blogId: string;
  initiallyLiked?: boolean;
};

export default function BlogDetailPage() {
  const params = useParams();
  const id = params?.id as string | undefined;

  console.log("BlogDetailPage id:", id);

  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const API_BASE_URL = "http://localhost:5001/";

  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<FetchedCategory[]>([]);
  const [matchedCategory, setMatchedCategory] =
    useState<FetchedCategory | null>(null);
  const [liked, setLiked] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  const fetchCategory = useCallback(async () => {
    try {
      const res = await get_hobbies_list();
      const mapped: FetchedCategory[] = (res?.data ?? []).map((item: any) => ({
        id: item.id,
        name: item.name,
        icon: (
          <InlineSvg
            svg={item.svg_code}
            title={item.name}
            className="w-[20px] h-[20px]"
          />
        ),
      }));
      setCategories(mapped);
      console.log("Fetched categories:", mapped);
      return mapped;
    } catch (error) {
      console.error("Error fetching interests:", error);
      return [];
    }
  }, []);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setError("Blog ID is missing.");
      return;
    }
    console.log(id);

    const fetchBlogDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await get_blog_by_id(id);
        console.log("Blog details fetched:", res);
        const fetchedCategory = await fetchCategory();

        if (res?.success) {
          setBlog(res.data);
          const foundCategory = fetchedCategory.find(
            (cat) => cat.id === res.data.event_category_id
          );
          console.log("Matched category:", foundCategory);
          setMatchedCategory(foundCategory || null);
        } else {
          setError(res?.message || "Blog not found or an error occurred.");
          setBlog(null);
        }
      } catch (err: any) {
        console.error("Failed to load blog:", err);
        setError("Failed to load blog: " + (err.message || "Unknown error"));
        setBlog(null);
        setMatchedCategory(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [id, fetchCategory]);

  useEffect(() => {
    if (!id) return;
    fetchComments();
  }, [id]);

  // Callback function to update the state
  const handleReplyOpen = (isOpen: boolean) => {
    setIsReplyOpen(isOpen);
  };

  const handleCommentSubmit = async (comment: string, replyTo?: string) => {
    console.log("Submitting comment:", { comment, replyTo });
    if (!id) {
      setMessage("Blog ID is missing.");
      return;
    }
    console.log("id is", id);
    try {
      const res = await comment_on_blog(id, {
        comment,
        reply_to: replyTo || "",
      });

      if (res.success) {
        setMessage(replyTo ? "Reply published!" : "Comment published!");
        await fetchComments();
      } else {
        setMessage("Failed to publish.");
      }
    } catch (err) {
      console.error("Error submitting comment:", err);
      setMessage("Something went wrong.");
    }
  };

  const fetchComments = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const res = await get_blog_comments(id);
      if (res?.success) {
        console.log("Comments fetched:", res.data);
        const mappedComments: Comment[] = (res.data ?? []).map((item: any) => ({
          id: item.id,
          author: item.user_id,
          date: new Date(item.created_at).toLocaleDateString("en-US", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }),
          content: item.content,
          avatarUrl: "/avatar-img/user-preview.png",
          replies: [],
        }));
        console.log("Mapped comments:", mappedComments);
        setComments(mappedComments);
      } else {
        setMessage("Failed to load comments.");
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
      setMessage("Something went wrong while fetching comments.");
    } finally {
      setLoading(false);
    }
  };

  console.log("commetns are", comments);

  if (loading) {
    return (
      <div className="p-4 text-center text-gray-500">
        <LoadingComponent />
      </div>
    );
  }

  if (!blog) return <div className="p-4 text-red-500">Post not found.</div>;
  console.log("Rendering post:", blog);

  return (
    <div
      className={`w-full mx-auto p-6 font-sans mb-12 ${
        isReplyOpen && !isDark ? "bg-gray-100" : ""
      } pb-80`}
    >
      {/* Blog Image */}
      <div className="mb-6 pt-[64px] ">
        <div className="relative">
          {blog.banner_img_url && (
            <Image
              src={`${API_BASE_URL}${blog.banner_img_url}`}
              alt={blog.blog_name || "Blog image"}
              width={800}
              height={400}
              className="rounded-t-4xl w-full h-auto"
              priority
            />
          )}
          <div className="absolute top-5 right-6 bg-app-bg-preview-category-tag-bg text-white text-xs px-3 py-1 rounded-full flex items-center space-x-1.5">
            {matchedCategory?.icon ? (
              matchedCategory.icon
            ) : (
              <Confetti2Icon width={20} height={20} />
            )}
            <span className="font-plusJakartaSans text-white font-normal text-[11px]">
              {/* {event.category} */}
              {/* House Party */}
              {matchedCategory?.name || "Category"}
            </span>
          </div>
        </div>
      </div>
      {/* Blog Header */}
      <div className="mb-6">
        <h2 className="font-plusJakartaSans font-bold text-[19px] text-app-blog-card-heading">
          {blog.blog_name}
        </h2>
        <p className="font-plusJakartaSans font-normal text-[13px]text-app-blog-card-author-text mt-1">
          {/* {blog.author_id} • {blog.created_at?.split("T")[0]} */}
          {blog.author_id} •{" "}
          {new Date(blog.created_at).toLocaleDateString("en-US", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </p>

        {/* Like and Social Media Icons */}
        <LikeAndShare
          initiallyLiked={false}
          blogId={id}
          initialLikes={3}
          youtube_link={blog.youtube_link}
          facebook_link={blog.facebook_link}
          instagram_link={blog.instagram_link}
          pinterest_link={blog.pinterest_link}
          twitter_link={blog.twitter_link}
        />
      </div>

      {/* Blog Content Section (using blog.blog_content directly) */}
      {blog.blog_content && (
        <div className="mb-8">
          <div className="mt-4">
            <h3 className="text-text-app-blog-card-heading font-plusJakartaSans font-normal text-[16px]">
              {blog.blog_content}
            </h3>
          </div>
        </div>
      )}

      {/* Video Embed */}
      {blog.blog_video_link && (
        <div className="aspect-video w-full mb-6">
          <iframe
            className="w-full h-full rounded-md"
            src={
              blog.blog_video_link.includes("embed")
                ? blog.blog_video_link
                : `https://www.youtube.com/embed/${
                    blog.blog_video_link.split("v=")[1]
                  }`
            }
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      {/* Comments Section */}
      <CommentForm onSubmit={handleCommentSubmit} />
      <CommentList comments={MockComments} onReplyOpen={handleReplyOpen} />
    </div>
  );
}
