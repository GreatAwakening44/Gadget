import React, { useState } from 'react';
import { motion } from 'framer-motion';


const BlogPostHeader = ({ post }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a1a1a] leading-tight tracking-tight">
        {post.title}
      </h1>

      {/* Subtitle */}
      <p className="mt-4 text-lg md:text-xl text-gray-500 leading-relaxed max-w-2xl">
        {post.subtitle}
      </p>

      {/* Writer row + Share button */}
      <div className="flex items-center justify-between mt-6">

        {/* Writer */}
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-[#BDF7DB] overflow-hidden flex-shrink-0
                          flex items-center justify-center relative">
            <img
              src={post.writer.avatar}
              alt={post.writer.name}
              className="w-full h-full object-cover"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <span className="text-sm font-semibold text-[#005124] absolute">
              {post.writer.initials}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-medium text-[#1a1a1a]">
              {post.writer.name}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">{post.date}</span>
            </div>
          </div>
        </div>

        {/* Share button */}
        <button
          onClick={handleShare}
          className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full 
                     border border-gray-200 hover:border-gray-400 hover:bg-gray-50
                     transition-all duration-200 cursor-pointer"
        >
          {copied ? (
            <>
              {/* Checkmark icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                fill="none" stroke="#005124" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-[#005124]">Copied!</span>
            </>
          ) : (
            <>
              {/* Share icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
              <span>Share</span>
            </>
          )}
        </button>

      </div>

      {/* Divider */}
      <hr className="mt-6 border-t border-gray-200" />
    </motion.div>
  );
};

export default BlogPostHeader;