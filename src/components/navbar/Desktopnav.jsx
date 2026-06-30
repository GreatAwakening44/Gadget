import   { FaChevronDown } from "react-icons/fa6";
import MegaDropdown from "../navbar/Megadropdown";
import   { laptopCategories, phoneCategories } from "../navbar/Navdata";

/**
 * DesktopNav
 * Renders the centre nav links (Laptops, iPhones) with mega-dropdowns,
 * plus the right-side links (Blog, Help, Cart).
 */

const DesktopNav = ({ openMenu, openDropdown, scheduleClose, cancelClose }) => {

  const triggerProps = (name) => ({
    onMouseEnter: () => openDropdown(name),
    onMouseLeave: scheduleClose,
  });

  const dropdownProps = {
    onMouseEnter: cancelClose,
    onMouseLeave: scheduleClose,
  };

  return (
    <div className="flex items-center gap-1">
      {/* Laptops */}
      <div className="relative" {...triggerProps("laptops")}>
        <button className="flex items-center gap-1 px-3 py-2 text-sm font-semibold text-[#6B0000] hover:bg-red-50 rounded-lg transition-colors">
          Laptops <FaChevronDown size={14} className={`transition-transform ${openMenu === "laptops" ? "rotate-180" : ""}`} />
        </button>
        {openMenu === "laptops" && (
          <MegaDropdown categories={laptopCategories} {...dropdownProps} />
        )}
      </div>

      {/* iPhones */}
      <div className="relative" {...triggerProps("phones")}>
        <button className="flex items-center gap-1 px-3 py-2 text-sm font-semibold text-[#6B0000] hover:bg-red-50 rounded-lg transition-colors">
          iPhones <FaChevronDown size={14} className={`transition-transform ${openMenu === "phones" ? "rotate-180" : ""}`} />
        </button>
        {openMenu === "phones" && (
          <MegaDropdown categories={phoneCategories} {...dropdownProps} />
        )}
      </div>
    </div>
  );
}

export default DesktopNav