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
      <h3 className="text-lg font-semibold mb-4 text-black">Comment</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          name="comment"
          className="w-full p-3 border border-gray-100 rounded-md bg-gray-200"
          rows={4}
          placeholder="Add your comment..."
          required
        />
        <div className="text-right">
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
          >
            Publish Comment
          </button>
        </div>
      </form>
    </div>
  );
}
