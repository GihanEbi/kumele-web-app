// components/LikeAndShare.tsx
'use client';

import { useState } from 'react';
import { FaHeart, FaTwitter, FaFacebook, FaLinkedin, FaShare } from 'react-icons/fa';

interface LikeAndShareProps {
  initialLikes: number;
}

export default function LikeAndShare({ initialLikes = 0 }: LikeAndShareProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setLikes(isLiked ? likes - 1 : likes + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="flex items-center gap-4 mt-2">
      <button 
        className="flex items-center gap-1 text-gray-600 hover:text-red-500 transition-colors"
        onClick={handleLike}
      >
        <FaHeart className={isLiked ? "text-red-500" : "text-gray-400 hover:text-red-500"} />
        <span>{likes} Likes</span>
      </button>

      <div className="flex gap-3 ml-4">
        <a href="#" aria-label="Share on Twitter">
          <FaTwitter className="text-gray-500 hover:text-blue-400 text-lg" />
        </a>
        <a href="#" aria-label="Share on Facebook">
          <FaFacebook className="text-gray-500 hover:text-blue-600 text-lg" />
        </a>
        <a href="#" aria-label="Share on LinkedIn">
          <FaLinkedin className="text-gray-500 hover:text-blue-700 text-lg" />
        </a>
        <a href="#" aria-label="Share">
          <FaShare className="text-gray-500 hover:text-gray-700 text-lg" />
        </a>
      </div>
    </div>
  );
}