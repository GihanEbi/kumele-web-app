// components/ReplyForm.tsx
"use client";

import { useState, FormEvent, useEffect, useRef } from 'react';

interface ReplyFormProps {
  // The name of the person being replied to
  replyingTo: string;
  // Function to call when the "Cancel" button is clicked
  onCancel: () => void;
  // Function to call with the new comment text on submission
  onSubmit: (replyText: string) => void;
}

export default function ReplyForm({ replyingTo, onCancel, onSubmit }: ReplyFormProps) {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Automatically focus the textarea when the form appears
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Don't submit an empty comment
    if (text.trim()) {
      onSubmit(text);
      setText(''); // Clear the form on successful submission
    }
  };

  return (
    <div
      //onClick={onCancel} // Clicking the background closes the modal
      className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-10 p-4"
    >
    <form onSubmit={handleSubmit} className="mt-4 p-4 rounded-xl bg-app-background-tertiary shadow-2xl">
      {/* The custom placeholder-like label */}
      <div className="mb-2 bg-app-search-bar-background p-2 rounded-lg">
        <span className="text-app-text-blue font-semibold">{replyingTo}:</span>
        <span className="text-app-search-bar-text ml-2">Type a comment</span>
         <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full bg-app-search-bar-background text-app-text-primary placeholder-gray-500 rounded-md resize-none focus:outline-none focus:ring-0 text-base"
        rows={3}
      />
      </div>
      
     

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 mt-3">
        <button
          type="button" // Important to prevent form submission
          onClick={onCancel}
          className="px-4 py-1.5 bg-app-background-card-secondary text-app-button-text-color font-semibold rounded-lg  transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-1.5 bg-app-background-card-secondary text-app-button-text-color font-semibold rounded-lg  transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          //disabled={!text.trim()} // Disable button if textarea is empty
        >
          Comment
        </button>
      </div>
    </form>
    </div>
  );
}