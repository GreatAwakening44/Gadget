import React from "react";

const StarRating = ({ rating, max = 5 }) => {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className={`w-2.5 h-2.5 rounded-full ${
            i < rating ? "bg-amber-400" : "bg-gray-200"
          }`}
        />
      ))}
    </div>
  );
};

export default StarRating;