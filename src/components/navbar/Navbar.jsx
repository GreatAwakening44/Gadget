import { useState } from "react";
import { Link } from 'react-router-dom';
import goodg from '../../../src/assets/goodg.png';
import { useCart } from "../shop/Cartcontext";


import { MdOutlineShoppingCart } from "react-icons/md";
import { FaHeadset } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";

import useDropdown from "./Usedropdown";
import DesktopNav from "../navbar/Desktopnav";
import SearchBar from "./SearchBar";
import MobileMenu from "./MobileMenu";

/**
 * Navbar – the full top navigation bar.
 *
 * Desktop layout:
 *   [Logo]  [Laptops ▾] [iPhones ▾]  [───── Search ─────]  [Blog] [Help 🛈] [Cart 🛒]
 *
 * Mobile layout:
 *   [Logo]                              [🔍] [🛒] [☰]
 *   (hamburger opens a right-side drawer with all links)
 */
const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openMenu, openDropdown, scheduleClose, cancelClose, closeAll } = useDropdown();
  const { itemCount } = useCart();

  return (
    <>
      <header className="sticky top-0 z-30 bg-white border-b border-gray-100 ">
        <div className="max-w-7xl mx-auto px-7 md:px-8 h-16 flex items-center gap-8">

          {/* ── Logo ── */}
          <Link to="/home" className="flex-shrink-0 z-20">
              <img src={goodg} alt="edrive" className="h-7 w-auto" />
          </Link>
          

          {/* ── Desktop: category nav ── */}
          <div className="hidden md:flex items-center" onMouseLeave={closeAll}>
            <DesktopNav
              openMenu={openMenu}
              openDropdown={openDropdown}
              scheduleClose={scheduleClose}
              cancelClose={cancelClose}
            />
          </div>

          {/* ── Desktop: search bar (grows to fill space) ── */}
          <div className="hidden md:flex flex-1">
            <SearchBar />
          </div>

          {/* ── Desktop: right-side links ── */}
          <nav className="hidden md:flex items-center gap-3 ml-2">
            <a
              href="/blog"
              className="px-3 py-2 text-sm font-semibold text-[#6B0000] hover:bg-red-50 rounded-lg transition-colors"
            >
              Blog
            </a>
            <a
              href="/help"
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-gray-600 hover:text-[#6B0000] hover:bg-red-50 rounded-lg transition-colors"
            >
              <FaHeadset size={16} />
              Help
            </a>
            <a
              href="/cart"
              className="relative flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-gray-600 hover:text-[#6B0000] hover:bg-red-50 rounded-lg transition-colors"
            >
              <MdOutlineShoppingCart size={18} />
              {/* Cart badge — swap count from your cart state */}
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#6B0000] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                4
              </span>
            </a>
          </nav>

          {/* ── Mobile: right-side icons ── */}
          <div className="flex md:hidden items-center gap-5 ml-auto">
            <button aria-label="Search" className="text-gray-600 hover:text-[#6B0000]">
              <FaSearch size={22} />
            </button>
            <a href="/cart" className="relative text-gray-600 hover:text-[#6B0000]">
              <MdOutlineShoppingCart size={22} />
              <span className="absolute -top-1 -right-1.5 w-4 h-4 bg-[#6B0000] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            </a>
            <button
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
              className="text-gray-600 hover:text-[#6B0000]"
            >
              <IoMdMenu size={25} />
            </button>
          </div>

        </div>
      </header>

      {/* Mobile drawer */}
      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}

export default Navbar