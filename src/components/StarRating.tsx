import { useState } from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export default function StarRating({ 
  rating, 
  onRatingChange, 
  readonly = false, 
  size = "md",
  showLabel = true 
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  };

  const getRatingLabel = (rating: number) => {
    if (rating === 0) return "No rating";
    if (rating === 1) return "Terrible - Complete scam";
    if (rating === 2) return "Poor - Very disappointing";
    if (rating === 3) return "Fair - Had some issues";
    if (rating === 4) return "Good - Mostly satisfied";
    if (rating === 5) return "Excellent - Highly recommend";
    return "";
  };

  const getRatingColor = (rating: number) => {
    if (rating <= 2) return "text-red-500";
    if (rating === 3) return "text-yellow-500";
    if (rating >= 4) return "text-green-500";
    return "text-muted-foreground";
  };

  const handleClick = (newRating: number) => {
    if (!readonly && onRatingChange) {
      onRatingChange(newRating);
    }
  };

  const handleMouseEnter = (newRating: number) => {
    if (!readonly) {
      setHoverRating(newRating);
    }
  };

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverRating(0);
    }
  };

  const activeRating = hoverRating || rating;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleClick(star)}
            onMouseEnter={() => handleMouseEnter(star)}
            onMouseLeave={handleMouseLeave}
            disabled={readonly}
            className={`transition-colors duration-200 ${
              readonly 
                ? "cursor-default" 
                : "cursor-pointer hover:scale-110 transition-transform"
            }`}
          >
            <Star
              className={`${sizeClasses[size]} ${
                star <= activeRating
                  ? "fill-current text-accent"
                  : "text-muted-foreground"
              }`}
            />
          </button>
        ))}
        {showLabel && (
          <span className={`ml-2 text-sm font-medium ${getRatingColor(rating)}`}>
            {getRatingLabel(rating)}
          </span>
        )}
      </div>
      {!readonly && hoverRating > 0 && (
        <div className="text-xs text-muted-foreground">
          Click to rate: {getRatingLabel(hoverRating)}
        </div>
      )}
    </div>
  );
}