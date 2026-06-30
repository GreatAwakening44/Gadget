import { FaSearch } from "react-icons/fa";

/**
 * SearchBar – rounded pill input used in the desktop navbar.
 */
export default function SearchBar() {
  return (
    <div className="relative flex-1 max-w-xs">
      <FaSearch
        size={15}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
      />
      <input
        type="search"
        placeholder="Search laptops, iPhones…"
        className="w-full pl-9 pr-4 py-2 text-sm bg-gray-100 border border-transparent rounded-full outline-none focus:border-[#6B0000] focus:bg-white transition-colors placeholder:text-gray-400"
      />
    </div>
  );
}