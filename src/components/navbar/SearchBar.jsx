import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
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

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  const results = getResults(query);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (product) => {
    setQuery("");
    setOpen(false);
    navigate(`/?filter=${product.id}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.trim()) {
      setOpen(false);
      navigate(`/?filter=${encodeURIComponent(normalize(query))}`);
    }
    if (e.key === "Escape") setOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative flex-1 max-w-xs">
      {/* Input */}
      <FaSearch
        size={15}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10"
      />
      <input
        type="search"
        value={query}
        onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
        onFocus={() => query && setOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder="Search laptops, iPhones…"
        className="w-full pl-9 pr-4 py-2 text-sm bg-gray-100 border border-transparent
                   rounded-full outline-none focus:border-[#6B0000] focus:bg-white
                   transition-colors placeholder:text-gray-400"
      />


      {/* Dropdown */}
      {open && query.trim().length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100
                        rounded-2xl shadow-lg z-50 overflow-hidden">
          {results.length === 0 ? (
            <p className="px-4 py-3 text-sm text-gray-400">No results found.</p>
          ) : (
            <>
              {/* Label tells user if it's a fallback */}
              <p className="px-4 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                {products.some((p) => normalize(p.name).includes(normalize(query)))
                  ? "Results"
                  : "Did you mean"}
              </p>
              <ul>
                {results.map((product) => (
                  <li key={product.id}>
                    <button
                      onMouseDown={() => handleSelect(product)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50
                                 transition-colors cursor-pointer text-left"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-9 h-9 rounded-lg object-cover bg-gray-100 flex-shrink-0"
                        onError={(e) => { e.target.style.display = "none"; }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-900 truncate">
                          {product.name}
                        </p>
                        <p className="text-xs text-gray-400">
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
      )}
    </div>
  );
}

export default SearchBar