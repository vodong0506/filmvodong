import React from "react";
import { useNavigate } from "react-router-dom";
import { toSlug } from "../../../libs/toSlug";
import HoverDetailCard from "../../../components/HoverDetailCard";
import useHoverDetailCard from "../../../hooks/useHoverDetailCard";
import useHorizontalScroll from "../../../hooks/useHorizontalScroll";
import ScrollArrow from "./ScrollArrow";

const MovieHorizontalSection = ({ title, movies }) => {
  const navigate = useNavigate();
  const { listRef, scrollLeft, scrollRight } = useHorizontalScroll(1200);

  const { activeHover, handleMouseEnter, handleMouseLeave, clearTimeoutHover } =
    useHoverDetailCard();

  if (!movies || movies.length === 0) return null;

  return (
    <section className="text-white lg:pt-5 pb-5 relative">
      <h1 className="text-xl lg:text-2xl font-semibold">{title}</h1>

      <ul
        ref={listRef}
        className="mt-5 flex flex-nowrap overflow-x-auto scroll-smooth pb-3
        [scrollbar-width:none] [-ms-overflow-style:none]
        [&::-webkit-scrollbar]:hidden gap-4 md:gap-3 lg:gap-5"
      >
        {movies.map((item) => (
          <li
            key={item.id}
            onClick={() =>
              navigate(`/movie/${toSlug(item.name)}?id=${item.id}`)
            }
            onMouseEnter={(e) => handleMouseEnter(e, item)}
            onMouseLeave={handleMouseLeave}
            className="cursor-pointer shrink-0"
          >
            <img
              className="rounded-2xl w-47 h-65 lg:w-65 lg:h-90"
              src={item.poster}
              alt={item.name}
            />
            <p className="mt-2 lg:w-65 w-47 px-2">{item.name}</p>
          </li>
        ))}
      </ul>

      {activeHover.show && (
        <HoverDetailCard
          movie={activeHover.movie}
          position={activeHover.pos}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={clearTimeoutHover}
        />
      )}

      <ScrollArrow onLeft={scrollLeft} onRight={scrollRight} />
    </section>
  );
};

export default MovieHorizontalSection;
