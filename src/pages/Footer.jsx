import React, { useState } from "react";
import { motion } from "framer-motion";

/**
 * Footer — minimal, single-file, framework-agnostic.
 * Swap BRAND, TAGLINE, and the link arrays below to reuse on any project.
 */

const BRAND = "Good Gadget Tech";
const TAGLINE = "Africa's No.1 Store for Laptops and Iphones.";

const COLUMNS = [
  {
    label: "Shop",
    links: ["Laptops", "Phones", "Accessories", "New arrivals"],
  },
  {
    label: "Company",
    links: ["About", "Journal", "Careers"],
  },
  {
    label: "Support",
    links: ["Help center", "Shipping", "Returns", "Contact"],
  },
];

const SOCIALS = ["Instagram", "X", "LinkedIn"];

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    // wire up to your subscribe handler
    setEmail("");
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="border-t border-[#ECECEC] bg-white"
    >
      <div className="max-w-7xl mx-auto px-7 md:px-10 lg:px-16 pt-16 pb-10">

        {/* Top: wordmark + newsletter */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 pb-14">
          <div>
            <h2
              className="text-3xl text-[#18181B]"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              {BRAND}
            </h2>
            <p className="mt-2 text-sm text-[#9A9A9F] italic">{TAGLINE}</p>
          </div>

          <form onSubmit={handleSubmit} className="w-full md:w-72">
            <label
              htmlFor="footer-email"
              className="block text-xs font-semibold uppercase tracking-widest text-[#9A9A9F] mb-2"
            >
              Stay in the loop
            </label>
            <div className="relative">
              <input
                id="footer-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="w-full bg-transparent border-b border-[#18181B] pb-2 pr-6 text-sm
                           text-[#18181B] placeholder:text-[#C8C8CC] outline-none
                           focus:border-[#6B0000] transition-colors duration-200"
              />
              <motion.span
                initial={false}
                animate={{ opacity: email.trim() ? 1 : 0, x: email.trim() ? 0 : -4 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 bottom-2 text-[#6B0000] text-sm pointer-events-none"
              >
                →
              </motion.span>
            </div>
          </form>
        </div>

        {/* Middle: link columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 pb-14 border-t border-[#ECECEC] pt-14">
          {COLUMNS.map((col) => (
            <div key={col.label}>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#9A9A9F] mb-4">
                {col.label}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-[#18181B] hover:text-[#6B0000] transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-[#ECECEC] pt-6">
          <p className="text-xs text-[#9A9A9F]">
            © {new Date().getFullYear()} {BRAND}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {SOCIALS.map((social) => (
              <a
                key={social}
                href="#"
                className="text-xs text-[#9A9A9F] hover:text-[#6B0000] transition-colors duration-200"
              >
                {social}
              </a>
            ))}
          </div>
        </div>

      </div>
    </motion.footer>
  );
};

export default Footer;