import React from "react";
import { Star } from "lucide-react";

function ratingToStars(rating: number) {
  const clamped = Math.max(0, Math.min(10, rating));
  return Math.round((clamped / 10) * 5);
}

export function Stars({ rating }: { rating: number }) {
  const filled = ratingToStars(rating);

  return (
    <div className="flex items-center gap-1" aria-label={`${rating}/10 rating`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={i < filled ? "h-4 w-4 fill-yellow-400 text-yellow-400" : "h-4 w-4 text-white/25"}
        />
      ))}
    </div>
  );
}
