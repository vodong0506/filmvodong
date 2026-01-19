import { useRef, useState } from "react";

const useHoverDetailCard = () => {
  const [activeHover, setActiveHover] = useState({
    show: false,
    movie: null,
    pos: null,
  });

  const timeoutRef = useRef(null);

  const handleMouseEnter = (e, item) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const pos = {
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
    };

    if (activeHover.show) {
      setActiveHover({ show: true, movie: item, pos });
      return;
    }

    timeoutRef.current = setTimeout(() => {
      setActiveHover({ show: true, movie: item, pos });
    }, 700);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setActiveHover((prev) => ({ ...prev, show: false }));
    }, 0);
  };

  const clearTimeoutHover = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  return {
    activeHover,
    handleMouseEnter,
    handleMouseLeave,
    clearTimeoutHover,
  };
};

export default useHoverDetailCard;
