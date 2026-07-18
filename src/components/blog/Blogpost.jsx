import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Navbar from '../navbar/Navbar';
import BlogPostHeader from './BlogPostHeader';
import BlogCard from './BlogCard';
import posts from './posts';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const post = posts.find((p) => p.id === id);

  // Scroll to top on every new article
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  // 404 — post not found
  if (!post) {
    return (
      <>
        <Topbar />
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-6">
          <h1 className="text-3xl font-bold text-[#1a1a1a]">Article not found</h1>
          <p className="text-gray-400">The article you are looking for does not exist.</p>
          <button
            onClick={() => navigate('/blog')}
            className="mt-4 bg-[#005124] text-white rounded-full px-6 py-2.5 text-sm font-medium
                       hover:bg-[#1a5c2e] transition-colors duration-200"
          >
            Back to articles
          </button>
        </div>
      </>
    );
  }

  // These must come AFTER the early return, not before it
  const related = posts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  return (
    <>
      {/* Helmet must be inside return */}
      <Helmet>
        <title>{post.title} | edrive Blog</title>
        <meta name="description" content={post.subtitle} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.subtitle} />
        <meta property="og:image" content={`https://edriveapp.com${post.image}`} />
        <meta property="og:url" content={`https://edriveapp.com/blog/${post.id}`} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content={post.writer.name} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": post.title,
            "description": post.subtitle,
            "image": ``,
            "author": {
              "@type": "Person",
              "name": post.writer.name
            },
            "publisher": {
              "@type": "Organization",
              "name": "",
              "url": "https://edriveapp.com"
            },
            "datePublished": post.date,
            "url": ``
          })}
        </script>
      </Helmet>

      <Navbar />

      <article className="min-h-screen px-6 md:px-10 lg:px-16 pt-12 pb-24">

        {/* Back button */}
        <button
          onClick={() => navigate('/blog')}
          className="flex items-center gap-2 text-medium text-gray-900 hover:text-gray-600
                     transition-colors duration-200 mb-8 cursor-pointer bg-transparent border-none p-0"
        >
          ← Back
        </button>

        {/* Constrained content column */}
        <div className="max-w-3xl mx-auto">

          {/* Header: title, subtitle, writer, divider */}
          <BlogPostHeader post={post} />

          {/* Main image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
            className="mt-8 w-full rounded-2xl overflow-hidden bg-gray-200 aspect-video"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </motion.div>

          {/* Article body */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.25 }}
            className="mt-10 flex flex-col gap-5"
          >
            {post.content.map((paragraph, i) => (
              <p key={i} className="text-base md:text-lg text-[#333] leading-relaxed">
                {paragraph}
              </p>
            ))}
          </motion.div>

        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <div className="mt-20 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-5">Related articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((p, i) => (
                <BlogCard key={p.id} post={p} index={i} />
              ))}
            </div>
          </div>
        )}

      </article>
    </>
  );
};

export default BlogPost;