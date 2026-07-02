import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import products from "../shop/Product";

const normalize = (str) => str.toLowerCase().replace(/\s+/g, " ").trim();

const getResults = (query) => {
  if (!query) return [];
  const q = normalize(query);
  const words = q.split(" ").filter(Boolean);

  const scored = products
    .map((p) => {
      const name = normalize(p.name);
      let score = 0;

      // Highest: exact full match
      if (name === q) score += 100;

      // High: name starts with the query
      if (name.startsWith(q)) score += 60;

      // High: name contains the full query as a substring
      if (name.includes(q)) score += 40;

      // Medium: every word in query appears in name
      const allWordsMatch = words.every((w) => name.includes(w));
      if (allWordsMatch) score += 30;

      // Lower: at least one word matches
      const matchedWords = words.filter((w) => name.includes(w));
      score += matchedWords.length * 10;

      return { product: p, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);

  // If top results are strong matches, return only those
  // Otherwise fall back to all partial matches
  const strong = scored.filter((r) => r.score >= 30);
  const results = strong.length > 0 ? strong : scored;

  return results.slice(0, 6).map((r) => r.product);
};

const formatNaira = (amount) => `₦${amount.toLocaleString()}`;

export default function MobileSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const results = getResults(query);

  // Auto-focus input when overlay opens
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleSelect = (product) => {
    setQuery("");
    setOpen(false);
    navigate(`/?filter=${product.id}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.trim()) {
      setOpen(false);
      setQuery("");
      navigate(`/?filter=${encodeURIComponent(normalize(query))}`);
    }
    if (e.key === "Escape") setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
    setQuery("");
  };

  const isDirect = query.trim() &&
    products.some((p) => normalize(p.name).includes(normalize(query)));

  return (
    <>
      {/* Trigger icon — sits inside the navbar */}
      <button
        aria-label="Search"
        onClick={() => setOpen(true)}
        className="text-gray-600 hover:text-[#6B0000]"
      >
        <FaSearch size={20} />
      </button>

      {/* Full-screen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 bg-white z-[60] flex flex-col md:hidden"
          >
            {/* Search input row */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
              <FaSearch size={16} className="text-gray-400 flex-shrink-0" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search laptops, iPhones…"
                className="flex-1 text-base text-slate-900 bg-transparent outline-none
                           placeholder:text-gray-400"
              />
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-700 flex-shrink-0"
              >
                <IoMdClose size={22} />
              </button>
            </div>

            {/* Results */}
            <div className="flex-1 overflow-y-auto">
              {!query.trim() && (
                <p className="px-5 pt-8 text-sm text-gray-400 text-center">
                  Start typing to search…
                </p>
              )}

              {query.trim().length > 0 && results.length === 0 && (
                <p className="px-5 pt-8 text-sm text-gray-400 text-center">
                  No results found for "{query}"
                </p>
              )}

              {results.length > 0 && (
                <>
                  <p className="px-5 pt-5 pb-2 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                    {isDirect ? "Results" : "Did you mean"}
                  </p>
                  <ul>
                    {results.map((product) => (
                      <li key={product.id}>
                        <button
                          onClick={() => handleSelect(product)}
                          className="w-full flex items-center gap-4 px-5 py-3
                                     hover:bg-gray-50 transition-colors text-left"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 rounded-xl object-cover bg-gray-100 flex-shrink-0"
                            onError={(e) => { e.target.style.display = "none"; }}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-slate-900 truncate">
                              {product.name}
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5">
                              {formatNaira(product.price)}
                            </p>
                          </div>
                          {product.stock === 0 && (
                            <span className="text-[10px] text-[#6B0000] font-semibold flex-shrink-0">
                              Out of stock
                            </span>
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}