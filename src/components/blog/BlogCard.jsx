import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';


const BlogCard = ({ post, index }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.08 }}
      onClick={() => navigate(`/blog/${post.id}`)}
      className="bg-white border border-gray-200 rounded-2xl overflow-hidden cursor-pointer
                 hover:border-gray-400 transition-colors duration-200 flex flex-col"
    >
      {/* Image */}
      <div className="w-full h-44 bg-gray-200 overflow-hidden flex-shrink-0">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">{post.date}</span>
        </div>
        <h3 className="text-base font-semibold text-[#1a1a1a] leading-snug">
          {post.title}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
          {post.excerpt}
        </p>
      </div>
    </motion.div>
  );
};

export default BlogCard;