import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const FeaturedCard = ({ post }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      onClick={() => navigate(`/blog/${post.id}`)}
      className="grid grid-cols-1 md:grid-cols-2 mt-8 rounded-2xl border border-gray-200 
                 overflow-hidden cursor-pointer hover:border-gray-400 transition-colors duration-200 bg-white"
    >
      {/* Image */}
      <div className="w-full min-h-[280px] md:min-h-[340px] bg-gray-200 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      </div>

      {/* Body */}
      <div className="flex flex-col justify-center gap-4 p-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a1a1a] leading-tight tracking-tight">
          {post.title}
        </h2>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400">{post.date}</span>
        </div>

        <p className="text-base text-gray-500 leading-relaxed">
          {post.excerpt}
        </p>
      </div>
    </motion.div>
  );
};

export default FeaturedCard;