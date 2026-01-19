import { useRef } from "react";

const useHorizontalScroll = (step = 1200) => {
  const listRef = useRef(null);

  const scrollLeft = () => {
    listRef.current?.scrollBy({
      left: -step,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    listRef.current?.scrollBy({
      left: step,
      behavior: "smooth",
    });
  };

  return { listRef, scrollLeft, scrollRight };
};

export default useHorizontalScroll;
