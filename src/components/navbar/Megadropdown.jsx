import { useNavigate } from "react-router-dom";

/**
 * MegaDropdown
 * Renders a multi-column dropdown panel.
 * Props:
 *   categories – array of { heading, items[] }
 *   onMouseEnter / onMouseLeave – passed from parent to keep the
 *   "stay open while hovering" behaviour working.
 */
const MegaDropdown = ({ categories, onMouseEnter, onMouseLeave }) => {
  const navigate = useNavigate();
  
  return (
    <div
      className="absolute top-full left-0 mt-1 bg-white border border-gray-100 shadow-xl rounded-xl p-6 z-50 min-w-[520px] grid gap-6"
      style={{ gridTemplateColumns: `repeat(${categories.length}, 1fr)` }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {categories.map((col) => (
        <div key={col.heading}>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
            {col.heading}
          </p>
          <ul className="space-y-2">
            {col.items.map((item) => (
              <li key={item.filter}>
                <button
                  onClick={() => navigate(`/?filter=${item.filter}`)}
                  className="text-sm text-gray-700 hover:text-[#6B0000] transition-colors duration-150 cursor-pointer bg-transparent border-none p-0 text-left"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default MegaDropdown