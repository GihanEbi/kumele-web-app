// components/StarRating.tsx
import React from 'react';
import StarIcon from '../StarIcon/StarIcon'; // Import the icon component

interface StarRatingProps {
  label: string;
  rating: number;
  totalStars?: number; // Optional, defaults to 5
}

const StarRating = ({ label, rating, totalStars = 5 }: StarRatingProps) => {
  // Calculate the width percentage for the filled stars layer
  const widthPercentage = (rating / totalStars) * 100;

  return (
    <div className="flex items-center space-x-4 py-2">
      {/* You can add your leading icon here if you want */}
      <span className="text-white w-32">{label}</span>

      {/* This container holds both star layers */}
      <div className="relative flex">
        
        {/* Layer 1: Background (Gray) Stars */}
        <div className="flex">
          {[...Array(totalStars)].map((_, index) => (
            <StarIcon key={`empty-${index}`} className="text-gray-600" />
          ))}
        </div>

        {/* Layer 2: Foreground (White) Stars - This layer will be clipped */}
        <div
          className="absolute top-0 left-0 h-full overflow-hidden flex"
          // The inline style sets the width dynamically based on the rating
          style={{ width: `${widthPercentage}%` }}
        >
          {[...Array(totalStars)].map((_, index) => (
            <StarIcon key={`filled-${index}`} className="text-gray-200" /> // Using gray-200 for a bright "filled" star
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default StarRating;