// components/CommentList.tsx
"use client";

import Image from "next/image";
import { DownArrowIcon } from "../../../public/svg-icons/icons";

type Comment = {
  id: string | number;
  author: string;
  date: string;
  content: string;
  isOwner?: boolean;
  avatarUrl?: string;
};

type CommentListProps = {
  comments: Comment[];
};

const RepliesBadge: React.FC = () => {
  return (
    <div className="inline-flex items-center px-4 py-1 rounded-full bg-app-blog-selected-tabs-background text-text-caption text-black space-x-2">
      <span>3 Replies</span>
      <span className="relative w-4 h-4">
        <DownArrowIcon className="h-9 w-9 mt-[-10px] ml-[-8px]" />
      </span>
    </div>
  );
};

export default function CommentList({ comments }: CommentListProps) {
  return (
    <div className="mt-8 space-y-6">
      {/* <h3 className="text-xl font-bold mb-6">Comments</h3> */}
      {comments.map((comment) => (
        <div key={comment.id} className=" pb-6 last:border-0">
          <div className="flex justify-center">
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-lg text-text-title text-app-blog-card-heading">
                {comment.author}
              </h4>
              <RepliesBadge />
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div></div>
            {/* AVATAR SECTION */}
            <div className="flex-shrink-0">
              {comment.avatarUrl ? (
                <Image
                  src={comment.avatarUrl}
                  alt={`${comment.author}'s avatar`}
                  width={70}
                  height={70}
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                  <span className="text-black font-medium">
                    {comment.author.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            <div className="flex-1">
              {/* COMMENT DATE AND REPLY SECTION */}
              <div className="flex items-center gap-2">
                <span className="text-app-search-bar-text text-xl">•</span>
                <p className="text-app-search-bar-text text-sm mt-1">
                  {comment.date}
                </p>
                <span className="text-app-search-bar-text text-xl">•</span>
                <span className="text-blue-500 text-m">Reply</span>
              </div>
              {/* COMMENT CONTENT SECTION */}
              <p className="mt-2 text-app-blog-card-heading">
                {comment.content}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
