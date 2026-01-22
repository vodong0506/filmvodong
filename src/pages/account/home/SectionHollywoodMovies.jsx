import React from "react";
import useGetListMovie from "../../../hooks/useGetListMovie";
import { useNavigate } from "react-router-dom";
import HoverDetailCard from "../../../components/HoverDetailCard";
import { toSlug } from "../../../libs/toSlug";
import useHoverDetailCard from "../../../hooks/useHoverDetailCard";
import useHorizontalScroll from "../../../hooks/useHorizontalScroll";
import ScrollArrow from "./ScrollArrow";

const SectionHollywoodMovies = () => {
  const { data } = useGetListMovie();
  const movie =
    data
      ?.filter(
        (item) =>
          item?.country === "Hoa Kỳ (Mỹ)" &&
          ["Hành động", "Khoa học viễn tưởng"].includes(item?.categories),
      )
      ?.sort((a, b) => {
        if (b.year !== a.year) {
          return b.year - a.year; // năm mới trước
        }
        return (b.view || 0) - (a.view || 0); // cùng năm → view cao trước
      })
      .slice(0, 10) || [];

  const navigate = useNavigate();

  const { listRef, scrollLeft, scrollRight } = useHorizontalScroll(1200);

  const { activeHover, handleMouseEnter, handleMouseLeave, clearTimeoutHover } =
    useHoverDetailCard();

  return (
    <>
      <section className="text-white pb-5 relative">
        <h1 className="text-xl lg:text-2xl font-semibold">
          Tuyệt đỉnh Hollywood
        </h1>

        <ul
          ref={listRef}
          className="mt-5 flex flex-nowrap overflow-x-auto scroll-smooth pb-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden gap-4 md:gap-3 lg:gap-5"
        >
          {movie?.map((item) => (
            <li
              key={item?.id}
              onClick={() =>
                navigate(`/movie/${toSlug(item.name)}?id=${item.id}`)
              }
              onMouseEnter={(e) => handleMouseEnter(e, item)}
              onMouseLeave={handleMouseLeave}
              className="cursor-pointer shrink-0"
            >
              <img
                className="rounded-xl lg:w-66 lg:h-40 w-46 h-27 md:w-50 md:h-30"
                src={item.banner}
                alt=""
              />
              <p className="mt-2 lg:w-66 md:w-50 w-45 px-2">{item.name}</p>
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
    </>
  );
};

export default SectionHollywoodMovies;
