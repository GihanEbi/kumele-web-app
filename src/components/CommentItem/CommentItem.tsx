"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Comment as CommentType } from "@/types/blog";
import { DownArrowIcon } from "../../../public/svg-icons/icons";
import ReplyForm from "../CommentForm/ReplyForm/ReplyForm";

interface CommentItemProps {
  comment: CommentType;
  isReply?: boolean;
  isLast?: boolean;
  onReplyOpen: (isOpen: boolean) => void;
  
  
}

export default function CommentItem({
  comment,
  isReply = false,
  isLast = false,
  onReplyOpen 
}: CommentItemProps) {
  const [repliesOpen, setRepliesOpen] = useState(false);
  const hasReplies = comment.replies && comment.replies.length > 0;
  const [isReplying, setIsReplying] = useState(false);

  const toggleReply = () => {
    const newState = !isReplying;
    setIsReplying(newState);
    onReplyOpen(newState); // Notify parent about state change
  };

  const handleReplySubmit = (replyText: string) => {
    console.log(`Replying to ${comment.author} with: "${replyText}"`);
    // In a real app, you would add the new reply to your state/data here
    setIsReplying(false); // Close the form after submission
  };

  useEffect(() => {
    if (isReplying) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isReplying]);

  return (
    <div className="flex gap-4">
      {/* AVATAR SECTION */}
      <div className="flex-shrink-0">
        {comment.avatarUrl ? (
          <Image
            src={comment.avatarUrl}
            alt={`${comment.author}'s avatar`}
            width={56} // Slightly smaller for a tighter look
            height={56}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="h-14 w-14 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-black font-medium text-xl">
              {comment.author.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* COMMENT BODY AND REPLIES SECTION */}
      <div className="">
        <div className="flex items-center gap-4 flex-wrap">
          <h4 className="font-bold text-lg text-app-blog-card-heading">
            {comment.author}
          </h4>
          {/* DYNAMIC REPLIES BUTTON */}
          {hasReplies && (
            <button
              onClick={() => setRepliesOpen(!repliesOpen)}
              className="inline-flex items-center px-3 py-1 rounded-full bg-app-blog-selected-tabs-background text-text-caption text-black space-x-2 transition-colors hover:bg-yellow-400"
            >
              <span>{comment.replies?.length} Replies</span>
              <span
                className={`transform transition-transform duration-300 ${
                  repliesOpen ? "rotate-180" : ""
                }`}
              >
                <DownArrowIcon className="h-6 w-6" />
              </span>
            </button>
          )}
        </div>

        {/* COMMENT METADATA (DATE, REPLY LINK) */}
        <div className="flex items-center gap-1  text-app-search-bar-text mt-1">
          <span>•</span>
          <span className="text-sm">{comment.date}</span>
          <span>•</span>
          <button
            onClick={toggleReply}
            className="font-semibold text-blue-500 hover:underline"
          >
            Reply
          </button>
        </div>

        {/* COMMENT CONTENT */}
        <p className="mt-2 text-app-blog-card-heading text-m">{comment.content}</p>

        {/* --- ADD THIS SECTION FOR THE REPLY FORM --- */}
        {isReplying && (
          <ReplyForm
            replyingTo={comment.author}
            onCancel={() => {setIsReplying(false);onReplyOpen(false);}}
            onSubmit={handleReplySubmit}
          />
        )}
        {/* --- END OF NEW SECTION --- */}

        {/* REPLIES SECTION (Conditional and Recursive) */}
        {hasReplies && repliesOpen && (
          <div className="mt-6 pt-6 space-y-6 border-l-2 border-dotted border-gray-300 pl-6 ">
            {/* 
              - ml-7: Aligns the vertical line with the center of the avatar (56px/2 = 28px, which is ml-7)
              - pl-6: Pushes the reply content away from the line
            */}
            {comment.replies?.map((reply) => (
              // RECURSION HAPPENS HERE!
              <CommentItem onReplyOpen={toggleReply} key={reply.id} comment={reply} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
