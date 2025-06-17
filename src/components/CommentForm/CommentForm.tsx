// components/CommentForm.tsx
'use client';

import { FormEvent } from 'react';

interface CommentFormProps {
  onSubmit: (comment: string) => void;
}

export default function CommentForm({ onSubmit }: CommentFormProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit(formData.get('comment') as string);
  };

  return (
    <div className="mt-8">
      <h3 className="font-plusJakartaSans font-bold text-[13.89px] mb-4 text-text-app-blog-card-heading">Comment</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          name="comment"
          className="w-full p-3  rounded-md bg-app-input-primary placeholder:text-text-app-blog-card-heading placeholder:font-plusJakartaSans placeholder:font-normal placeholder:text-[13.89px] text-text-app-blog-card-heading resize-none"
          rows={4}
          placeholder="Add your comment..."
          required
        />
        <div className="text-right">
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-app-button-primary text-app-text-blackandwhite rounded-md font-plusJakartaSans font-normal text-[14.57px]"
          >
            Publish Comment
          </button>
        </div>
      </form>
    </div>
  );
}
