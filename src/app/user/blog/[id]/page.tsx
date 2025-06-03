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
    content: "Amazing content!",
    isOwner: true,
  },
  {
    id: 2,
    author: "Jakob Hoffman",
    date: "23 August 2022",
    content: "Nice writeup and beautiful design!",
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
          className="rounded-lg w-full h-auto"
          priority
        />
      </div>
      {/* Blog Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{post.title}</h1>
        <p className="text-sm text-gray-500 mt-1">
          {post.author} • {post.date}
        </p>

        {/* Like and Social Media Icons */}
        <LikeAndShare initialLikes={3} />
      </div>

      {/* Health Supplements Section */}
      {post.healthSupplements && (
        <div className="mb-8">
          <div className="mt-4">
            <h3 className="font-semibold">Health Supplement range:</h3>
            <ul className="list-disc pl-5 mt-2">
              <li>
                <span className="font-medium">Home:</span>{" "}
                {post.healthSupplements.home}
              </li>
              <li>
                <span className="font-medium">Fair:</span>{" "}
                {post.healthSupplements.fair}
              </li>
            </ul>
          </div>
        </div>
      )}

      <hr className="border-t border-gray-300 my-6" />

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
      <p className="text-gray-700 mb-6">{post.content}</p>

      {/* Blog Tips Section */}
      {post.blogTips && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2">{post.blogTips.title}</h2>
          <p className="font-bold text-lg">{post.blogTips.subtitle}</p>
          <p className="font-bold text-blue-600 mt-2">{post.blogTips.cta}</p>
        </div>
      )}

      {/* Description Text */}
      {post.description && (
        <div className="mb-8 bg-gray-100 p-4 rounded">
          <p className="text-gray-700">{post.description}</p>
        </div>
      )}

      <hr className="border-t border-gray-300 my-6" />

      {/* Content Sections */}
      {post.contentSections && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Content</h2>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Key components:</h3>

            <div className="mt-4">
              <h4 className="font-medium">Web Content:</h4>
              <ul className="mt-2 space-y-1">
                {post.contentSections.webContent.map((weight) => (
                  <li key={weight}>{weight}kg (April 2022 - Ready)</li>
                ))}
              </ul>
            </div>
          </div>

          <hr className="border-t border-gray-300 my-6" />

          <div>
            <h3 className="font-semibold mb-2">Job Domain</h3>
            <ul className="mt-2 space-y-1">
              {post.contentSections.jobDomain.map((weight) => (
                <li key={`job-${weight}`}>{weight}kg (April 2022 - Ready)</li>
              ))}
            </ul>
          </div>
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
