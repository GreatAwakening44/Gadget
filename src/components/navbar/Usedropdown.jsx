import { useState, useRef, useCallback } from "react";

/**
 * Manages hover-open dropdowns with a small delay before closing,
 * so the user can move the mouse from the trigger into the dropdown
 * without it snapping shut.
 */
const useDropdown = () => {
    
  const [openMenu, setOpenMenu] = useState(null); // "laptops" | "phones" | null
  const closeTimer = useRef(null);

  const openDropdown = useCallback((name) => {
    clearTimeout(closeTimer.current);
    setOpenMenu(name);
  }, []);

  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120);
  }, []);

  const cancelClose = useCallback(() => {
    clearTimeout(closeTimer.current);
  }, []);

  const closeAll = useCallback(() => {
    clearTimeout(closeTimer.current);
    setOpenMenu(null);
  }, []);

  return { openMenu, openDropdown, scheduleClose, cancelClose, closeAll };
}

export default useDropdown