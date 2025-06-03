// components/CommentList.tsx
'use client';

import Image from 'next/image';

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

export default function CommentList({ comments }: CommentListProps) {
  return (
    <div className="mt-8 space-y-6">
      {/* <h3 className="text-xl font-bold mb-6">Comments</h3> */}
      {comments.map((comment) => (
        <div key={comment.id} className="border-b border-gray-200 pb-6 last:border-0">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              {comment.avatarUrl ? (
                <Image
                  src={comment.avatarUrl}
                  alt={`${comment.author}'s avatar`}
                  width={40}
                  height={40}
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
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-lg text-black">{comment.author}</h4>
                
              </div>
              <div className='flex items-center gap-2'>
              <p className="text-black text-sm mt-1">
                {comment.date}
              </p>
              <span className="text-black text-xl">•</span>
                <span className="text-blue-500 text-m">Reply</span>
                </div>
              <p className="mt-2 text-black">
                {comment.content}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}