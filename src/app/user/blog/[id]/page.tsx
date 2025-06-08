// app/blog/[id]/page.tsx
"use client";
import Image from "next/image";
import { BlogCardProps, Comment } from "@/types/blog";
import LikeAndShare from "@/components/LikeAndShare/LikeAndShare";
import CommentForm from "@/components/CommentForm/CommentForm";
import CommentList from "@/components/CommentList/CommentList";

// Mock data - replace with your actual data fetching
const blogPosts: (BlogCardProps & {
  healthSupplements?: {
    home: string;
    fair: string;
  };
  blogTips?: {
    title: string;
    subtitle: string;
    cta: string;
  };
  description?: string;
  contentSections?: {
    webContent: number[];
    jobDomain: number[];
  };
})[] = [
  {
    id: "1",
    imageUrl: "/images/blog-demo.jpg",
    title: "Singleton of Glen Ord 38-year old and the Singleton range.",
    categoryName: "House Party",
    author: "Steve Austin",
    date: "23 August, 2022",
    showIndicator: true,
    tags: ["all"],
    content:
      "Aliqua fugiat nostrud duis enim ullamco nisi veniam excepteur consectetur est deserunt.",
    videoUrl: "https://www.youtube.com/watch?v=dnxmq9aq2yg",
    healthSupplements: {
      home: "1.5kg",
      fair: "0.5kg",
    },
    blogTips: {
      title: "How to Start a Blog",
      subtitle: "Easy Easy!",
      cta: "Explore Clicks",
    },
    description:
      "Make all the questions and your results up on an open menu. Some answers before Zoom can be found in your website or visit www.meetdown.com. You can also see some examples and suggestions that are not available at any time.",
    contentSections: {
      webContent: [2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5],
      jobDomain: [2.5, 3.5, 4.5, 5.5, 6.5, 7.5],
    },
  },
  {
    id: "2",
    imageUrl: "/images/blog-demo.jpg",
    title: "Second test post",
    categoryName: "House Party",
    author: "Steve Austin",
    date: "23 August, 2022",
    showIndicator: true,
    tags: ["all"],
    content:
      "Aliqua fugiat nostrud duis enim ullamco nisi veniam excepteur consectetur est deserunt.",
    videoUrl: "https://www.youtube.com/watch?v=k9g6aVLH3p4",
  },
];

const comments: Comment[] = [
  {
    id: 1,
    author: "Josh Durrant",
    date: "25 April 2022",
    content:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    isOwner: true,
    avatarUrl: "/avatar-img/commentor3.png",
  },
  {
    id: 2,
    author: "Jakob Hoffman",
    date: "23 August 2022",
    content:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    avatarUrl: "/avatar-img/commentor5.png",
  },
];

export default function BlogDetailPage({ params }: { params: { id: string } }) {
  const post = blogPosts.find((b) => b.id === params.id);

  if (!post) return <div className="p-4 text-red-500">Post not found.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      {/* Blog Image */}
      <div className="mb-6">
        <Image
          src={post.imageUrl}
          alt={post.title}
          width={800}
          height={400}
          className="rounded-t-4xl w-full h-auto"
          priority
        />
      </div>
      {/* Blog Header */}
      <div className="mb-6">
        <h2 className="text-text-title text-app-blog-card-heading text-[19px] font-medium">
          {post.title}
        </h2>
        <p className="text-text-caption text-app-blog-card-author-text mt-1">
          {post.author} • {post.date}
        </p>

        {/* Like and Social Media Icons */}
        <LikeAndShare initialLikes={3} />
      </div>

      {/* Health Supplements Section */}
      {post.healthSupplements && (
        <div className="mb-8">
          <div className="mt-4">
            <h3 className=" text-text-app-blog-card-heading text-text-body">
              Health Supplement range:
            </h3>
            <ul className="list-disc pl-5 mt-2">
              <li className="text-text-app-blog-card-heading text-text-body">
                <span className="text-text-app-blog-card-heading text-body">Home:</span>{" "}
                {post.healthSupplements.home}
              </li>
              <li className="text-text-app-blog-card-heading text-text-body">
                <span className="text-text-app-blog-card-heading text-text-body">Fair:</span>{" "}
                {post.healthSupplements.fair}
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* <hr className="border-t border-gray-300 my-6" /> */}

      {/* Video Embed */}
      {post.videoUrl && (
        <div className="aspect-video w-full mb-6">
          <iframe
            className="w-full h-full rounded-md"
            src={
              post.videoUrl.includes("embed")
                ? post.videoUrl
                : `https://www.youtube.com/embed/${
                    post.videoUrl.split("v=")[1]
                  }`
            }
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      {/* Blog Content */}
      <p className="text-text-app-blog-card-heading mb-6 text-text-body">{post.content}</p>

      {/* Blog Tips Section */}
      {post.blogTips && (
        <div className="mb-8">
          <h2 className="text-text-body font-bold mb-2 text-text-app-blog-card-heading">
            {post.blogTips.title}
          </h2>
          <p className="text-text-body text-text-app-blog-card-heading">
            {post.blogTips.subtitle}
          </p>
          <p className="font-bold text-text-app-blog-card-heading mt-2">
            {post.blogTips.cta}
          </p>
        </div>
      )}

      {/* Description Text */}
      {post.description && (
        <div className="mb-8p-4 rounded">
          <p className="text-text-body text-text-app-blog-card-heading">{post.description}</p>
        </div>
      )}

      {/* Comments Section */}
      <CommentForm
        onSubmit={(comment) => console.log("New comment:", comment)}
      />
      <CommentList comments={comments} />
    </div>
  );
}
