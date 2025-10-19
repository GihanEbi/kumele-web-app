"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Comment as CommentType } from "@/types/blog";
import { DownArrowIcon } from "../../../public/svg-icons/icons";
import ReplyForm from "../CommentForm/ReplyForm/ReplyForm";

const REPLY_INDENT = 72; // avatar (56) + gap-4 (16)

interface CommentItemProps {
  comment: CommentType;
  onReplyOpen: (isOpen: boolean) => void;
  depth?: number; // 0 = top-level, 1 = first reply, …
  autoOpen?: boolean;
  isReply?: boolean;
}

export default function CommentItem({
  comment,
  onReplyOpen,
  depth = 0,
  autoOpen = false,
  isReply = false,
}: CommentItemProps) {
  /* ---------------------------------------------------------------- state */
  const [repliesOpen, setRepliesOpen] = useState(autoOpen);
  const [isReplying, setIsReplying] = useState(false);
  const hasReplies = comment.replies && comment.replies.length > 0;

  useEffect(() => setRepliesOpen(autoOpen), [autoOpen]);

  /* --------------------------------------------------------------- refs */
  const lineRef = useRef<HTMLDivElement>(null);
  const repliesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      repliesOpen &&
      hasReplies &&
      lineRef.current &&
      repliesContainerRef.current
    ) {
      const lastReply = repliesContainerRef.current.lastElementChild;
      if (lastReply) {
        const lastAvatar = lastReply.querySelector(
          'img, [class*="rounded-full"]'
        );
        if (lastAvatar) {
          const lineTop = lineRef.current.getBoundingClientRect().top;
          const avatarRect = lastAvatar.getBoundingClientRect();
          const h = avatarRect.top - lineTop + avatarRect.height / 2;
          lineRef.current.style.height = `${h}px`;
        }
      }
    } else if (lineRef.current) {
      lineRef.current.style.height = "0px";
    }
  }, [repliesOpen, hasReplies]);

  /* ----------------------------------------------------------- handlers */
  const toggleReplyForm = () => {
    const next = !isReplying;
    setIsReplying(next);
    onReplyOpen(next);
  };

  const handleReplySubmit = (text: string) => {
    console.log(`Replying to ${comment.author}: “${text}”`);
    setIsReplying(false);
  };

  /* ------------------------------------------------------- computed style */
  const rowStyle =
    depth > 1 ? { marginLeft: `-${(depth - 1) * REPLY_INDENT}px` } : undefined;

  /* --------------------------------------------------------------- render */
  return (
    <div className="relative">
      {/* horizontal branch — only first-level replies */}
      {depth === 1 && (
        <div
          className="absolute top-7 -left-11 h-px w-11
                     bg-[repeating-linear-gradient(to_right,black_0_2px,transparent_2px_8px)]
                     dark:bg-[repeating-linear-gradient(to_right,white_0_2px,transparent_2px_8px)]"
          aria-hidden="true"
        />
      )}

      {/* main row ---------------------------------------------------------- */}
      <div className="flex gap-4" style={rowStyle}>
        {/* avatar */}
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

        {/* text column */}
        <div className="relative flex-1">
          {/* vertical dotted spine */}
          {hasReplies && (
            <div
              ref={lineRef}
              className="absolute -left-11 top-7 w-px
                         bg-[repeating-linear-gradient(to_bottom,black_0_2px,transparent_2px_8px)]
                         dark:bg-[repeating-linear-gradient(to_bottom,white_0_2px,transparent_2px_8px)]
                         transition-all duration-300"
              aria-hidden="true"
              style={{ height: 0 }}
            />
          )}

          {/* header row */}
          <div className="flex items-center gap-4 flex-wrap">
            <h4 className="font-plusJakartaSans font-bold text-[15px] text-app-blog-card-heading">
              {comment.author}
            </h4>

            {/* Replies toggle chip only on top-level comments */}
            {/* {depth === 0 && hasReplies && (
              <button
                onClick={() => setRepliesOpen(!repliesOpen)}
                className="inline-flex items-center px-2 py-1 rounded-full
                           bg-app-blog-selected-tabs-background
                           font-plusJakartaSans text-[11.81px] text-black space-x-2"
              >
                <span>{comment.replies!.length} Replies</span>
                <span
                  className={`transform transition-transform duration-300 ${
                    repliesOpen ? "rotate-180" : ""
                  }`}
                >
                  <DownArrowIcon className="h-6 w-6" />
                </span>
              </button>
            )} */}
          </div>

          {/* meta row */}
          <div
            className="flex items-center gap-1 text-app-search-bar-text
                          font-plusJakartaSans text-[16px] mt-1"
          >
            <span>•</span>
            <span>{comment.date}</span>
            <div></div>
            {/* <button
              onClick={toggleReplyForm}
              className="text-blue-500 hover:underline"
            >
              Reply
            </button> */}
          </div>

          {/* body */}
          <p className="mt-2 text-start text-app-blog-card-heading font-plusJakartaSans text-[14px]">
            {comment.content}
          </p>

          {/* reply form */}
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

          {/* nested replies */}
          {hasReplies && repliesOpen && (
            <div ref={repliesContainerRef} className="mt-6 pt-6 space-y-6">
              {comment.replies!.map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  onReplyOpen={onReplyOpen}
                  depth={depth + 1}
                  autoOpen={repliesOpen}
                  isReply
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
