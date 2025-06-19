"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Comment as CommentType } from "@/types/blog";
import { DownArrowIcon } from "../../../public/svg-icons/icons";
import ReplyForm from "../CommentForm/ReplyForm/ReplyForm";

interface CommentItemProps {
  comment: CommentType;
  isReply?: boolean;
  onReplyOpen: (isOpen: boolean) => void;
}

export default function CommentItem({
  comment,
  isReply = false,
  onReplyOpen,
}: CommentItemProps) {
  const [repliesOpen, setRepliesOpen] = useState(false);
  const hasReplies = comment.replies && comment.replies.length > 0;
  const [isReplying, setIsReplying] = useState(false);

  const lineRef = useRef<HTMLDivElement>(null);
  const repliesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (repliesOpen && hasReplies && lineRef.current && repliesContainerRef.current) {
      const lastReply = repliesContainerRef.current.lastElementChild;
      if (lastReply) {
        const lastAvatar = lastReply.querySelector('img, [class*="rounded-full"]');
        if (lastAvatar) {
          const lineRect = lineRef.current.getBoundingClientRect();
          const lastAvatarRect = lastAvatar.getBoundingClientRect();
          const height = lastAvatarRect.top - lineRect.top + lastAvatar.clientHeight / 2;
          lineRef.current.style.height = `${height}px`;
        }
      }
    } else if (lineRef.current) {
      lineRef.current.style.height = '0px';
    }
  }, [repliesOpen, hasReplies]);

  const toggleReply = () => {
    const newState = !isReplying;
    setIsReplying(newState);
    onReplyOpen(newState);
  };

  const handleReplySubmit = (replyText: string) => {
    console.log(`Replying to ${comment.author} with: "${replyText}"`);
    setIsReplying(false);
  };

  return (
    <div className="relative">
      {/* horizontal dotted lines */}
      {isReply && (
        <div
          className="absolute top-7 -left-11 h-px w-11 border-t border-dotted border-black dark:border-white"
          aria-hidden="true"
        />
      )}
      <div className="flex gap-4">
       
        <div className="relative z-10 flex-shrink-0">
          {comment.avatarUrl ? (
            <Image
              src={comment.avatarUrl}
              alt={`${comment.author}'s avatar`}
              width={56}
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
        <div className="relative flex-1">
          {/* vertical lines */}
          {hasReplies && (
            <div
              ref={lineRef}
              className="absolute -left-11 top-7 w-px border-l border-dotted border-black dark:border-white transition-all duration-300"
              aria-hidden="true"
              style={{ height: 0 }}
            />
          )}

          <div className="flex items-center gap-4 flex-wrap">
            <h4 className="font-plusJakartaSans font-bold text-[18px]text-app-blog-card-heading">
              {comment.author}
            </h4>
            {hasReplies && (
              <button
                onClick={() => setRepliesOpen(!repliesOpen)}
                className="inline-flex items-center px-3 py-1 rounded-full bg-app-blog-selected-tabs-background font-plusJakartaSans font-normal text-[11.81px] text-black space-x-2"
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
          <div className="flex items-center gap-1 text-app-search-bar-text font-plusJakartaSans font-normal text-[16px] mt-1">
            <span>•</span>
            <span className="">{comment.date}</span>
            <span>•</span>
            <button
              onClick={toggleReply}
              className="font-plusJakartaSans font-normal text-[16px] text-blue-500 hover:underline"
            >
              Reply
            </button>
          </div>
          <p className="mt-2 text-app-blog-card-heading font-plusJakartaSans font-normal text-[14px]">
            {comment.content}
          </p>
          {isReplying && (
            <ReplyForm
              replyingTo={comment.author}
              onCancel={() => {
                setIsReplying(false);
                onReplyOpen(false);
              }}
              onSubmit={handleReplySubmit}
            />
          )}
          {hasReplies && repliesOpen && (
            <div ref={repliesContainerRef} className="mt-6 pt-6 space-y-6">
              {comment.replies?.map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  isReply={true}
                  onReplyOpen={onReplyOpen}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}