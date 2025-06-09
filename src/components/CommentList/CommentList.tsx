// components/CommentList.tsx
"use client";

import { Comment } from "@/types/blog"; // Adjust path if necessary
import CommentItem from '../../components/CommentItem/CommentItem'

type CommentListProps = {
  comments: Comment[];
  onReplyOpen: (isOpen: boolean) => void;
};

export default function CommentList({ comments,onReplyOpen }: CommentListProps) {
  return (
    <div className="mt-8 space-y-4">
      {/* <h3 className="text-xl font-bold mb-6 text-app-blog-card-heading">
        {comments.length} Comments
      </h3> */}
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment}  onReplyOpen={onReplyOpen}/>
      ))}
    </div>
  );
}