import React, { useState } from 'react';
import { motion } from "framer-motion";
import FeaturedCard from '../components/blog/FeaturedCard';
import BlogCard from '../components/blog/BlogCard';
import posts from '../components/blog/posts';
import Navbar from '../components/navbar/Navbar';
import Footer from '../pages/Footer';
import { Helmet } from 'react-helmet-async';

const Bloger = () => {
    const [activeFilter, setActiveFilter] = useState("All");

    const filtered =
        activeFilter === 'All'
            ? posts
            : posts.filter((p) => p.category === activeFilter);

    const featured = filtered[0] || null;
    const rest = filtered.slice(1);

    return (
        <>
            {/* Helmet must be inside return */}
            <Helmet>
                <title>Blog</title>
                <meta name="description" content="News, insights, and updates about ride-hailing and intercity travel in Nigeria." />
                <meta property="og:title" content="Blog and Articles | edrive" />
                <meta property="og:url" content="https://edriveapp.com/blog" />
            </Helmet>

            <Navbar />

            <section className="mt-4 min-h-screen px-7 md:px-10 lg:px-16 pt-12 mb-[7rem]">

                {/* Page heading + Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <div>
                        <h1 className="text-xl md:text-3xl lg:text-3xl tracking-tight 
                                       font-extrabold text-[#1a1a1a] lg:leading-tight leading-tighter">
                            Blog
                        </h1>
                    </div>
                </motion.div>

                {/* Empty state */}
                {filtered.length === 0 && (
                    <p className="mt-16 text-center text-gray-400 text-base">
                        No articles in this category yet.
                    </p>
                )}

                {/* Featured card */}
                {featured && <FeaturedCard post={featured} />}

                {/* Recent grid */}
                {rest.length > 0 && (
                    <div className="mt-12">
                        <h2 className="text-2xl font-medium tracking-tight text-[#1a1a1a] mb-5">
                            Recent
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {rest.map((post, i) => (
                                <BlogCard key={post.id} post={post} index={i} />
                            ))}
                        </div>
                    </div>
                )}

            </section>

            <Footer className="mt-12" />
        </>
    );
};

export default Bloger;