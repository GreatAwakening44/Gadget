import { FaChevronDown } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

import { useState } from "react";
import { laptopCategories, phoneCategories } from "../navbar/Navdata";

/**
 * MobileMenu
 * Slide-in drawer for mobile.
 * Shows Blog / Help at the top, then collapsible Laptops & iPhones sections.
 */
export default function MobileMenu({ isOpen, onClose }) {
  const [expanded, setExpanded] = useState(null); // "laptops" | "phones" | null

  const toggle = (name) => setExpanded((prev) => (prev === name ? null : name));

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-40 md:hidden"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-2xl flex flex-col md:hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <span className="font-bold text-[#6B0000] text-lg">Menu</span>
          <button onClick={onClose} aria-label="Close menu">
            <IoMdClose size={22} className="text-gray-500" />
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 overflow-y-auto px-5 py-4 space-y-1">
          {/* Top-level links */}
          <a href="#" className="block py-2.5 text-sm font-semibold text-gray-700 hover:text-[#6B0000]">
            Blog
          </a>
          <a href="#" className="block py-2.5 text-sm font-semibold text-gray-700 hover:text-[#6B0000]">
            Help
          </a>
        </nav>

        <div className="px-5">
            <span className="font-bold text-[#6B0000] text-lg">Categories</span>
        </div>
          
        <nav>
          <hr className="my-3 border-gray-100" />

          {/* Laptops accordion */}
          <Accordion
            label="Laptops"
            isOpen={expanded === "laptops"}
            onToggle={() => toggle("laptops")}
            categories={laptopCategories}
          />

          {/* iPhones accordion */}
          <Accordion
            label="iPhones"
            isOpen={expanded === "phones"}
            onToggle={() => toggle("phones")}
            categories={phoneCategories}
          />
        </nav>
      </div>
    </>
  );
}

/** Collapsible accordion used inside the mobile drawer */
function Accordion({ label, isOpen, onToggle, categories }) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full py-2.5 text-sm font-semibold text-[#6B0000]"
      >
        {label}
        <FaChevronDown size={16} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="pl-3 pb-3 space-y-4">
          {categories.map((col) => (
            <div key={col.heading}>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1.5">
                {col.heading}
              </p>
              <ul className="space-y-1.5">
                {col.items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-gray-600 hover:text-[#6B0000]">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}