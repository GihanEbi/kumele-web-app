"use client";

import { useEffect, useState } from "react";

// Type for a single grid cell
type Cell = {
  id: number;
  gif: string;
};

// Type for each animation step
type AnimationStep = {
  indices: number[];
  gif: string;
};

// Fallback gifs (used to fill the rest of the grid)
const fallbackGifs: string[] = [
  "/common-gifs/horse.gif",
  "/common-gifs/activitist.gif",
  "/common-gifs/soup.gif",
  "/common-gifs/tree.gif",
  "/common-gifs/beer.gif",
  "/common-gifs/pacman.gif",
  "/common-gifs/movie.gif",
  "/common-gifs/boat.gif",
];

// Animation sequence with special placement
const animationSteps: AnimationStep[] = [
  { indices: [2, 5, 8], gif: "/common-gifs/hand scissors.gif" }, // Column 3
  { indices: [6, 7, 8], gif: "/common-gifs/beer.gif" }, // Row 3
  { indices: [1, 4, 7], gif: "/common-gifs/boat.gif" }, // Column 2
  { indices: [0, 1, 2], gif: "/common-gifs/activitist.gif" }, // Row 1
  { indices: [2, 4, 6], gif: "/common-gifs/pacman.gif" }, // Diagonal
];

// Helper: Create the 3x3 grid with special and unique filler GIFs
const createGridWithSpecials = (
  specialIndices: number[],
  specialGif: string
): Cell[] => {
  const specialSet = new Set(specialIndices);

  const uniqueGifPool = new Set([
    ...fallbackGifs,
    ...animationSteps.map((step) => step.gif),
  ]);
  uniqueGifPool.delete(specialGif);

  const fillerGifs = Array.from(uniqueGifPool).sort(() => 0.5 - Math.random());
  let fillerIndex = 0;

  return Array.from({ length: 9 }, (_, i) => {
    if (specialSet.has(i)) {
      return { id: i, gif: specialGif };
    }
    const gif = fillerGifs[fillerIndex % fillerGifs.length];
    fillerIndex++;
    return { id: i, gif };
  });
};

// Props for customizable cell size
interface GifCarouselProps {
  width?: number; 
  height?: number; 
}

// Main component
const GifCarousel: React.FC<GifCarouselProps> = ({
  width = 80,
  height = 80,
}) => {
  const [grid, setGrid] = useState<Cell[]>([]);

  useEffect(() => {
    let step = 0;

    const loopAnimation = () => {
      const { indices, gif } = animationSteps[step];
      const newGrid = createGridWithSpecials(indices, gif);
      setGrid(newGrid);

      step = (step + 1) % animationSteps.length;
      setTimeout(loopAnimation, 5000); // 5 seconds per frame
    };

    loopAnimation();
  }, []);

  const hasRightBorder = (index: number) => (index + 1) % 3 !== 0;
  const hasBottomBorder = (index: number) => index < 6;

  return (
    <div className="w-fit mx-auto mt-10 p-2 rounded-xl bg-gray-100/30">
      <div className="grid grid-cols-3 gap-0">
        {grid.map((cell) => (
          <div
            key={cell.id}
            className={`flex items-center justify-center
              ${hasRightBorder(cell.id) ? "border-r-4 border-black" : ""}
              ${hasBottomBorder(cell.id) ? "border-b-4 border-black" : ""}`}
            style={{ width, height }}
          >
            <img
              src={cell.gif}
              alt={`gif-${cell.id}`}
              style={{
                width: width * 0.6,
                height: height * 0.6,
                objectFit: "contain",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GifCarousel;
