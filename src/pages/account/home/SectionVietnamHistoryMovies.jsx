import React from "react";
import useGetListMovie from "../../../hooks/useGetListMovie";
import { useNavigate } from "react-router-dom";
import { toSlug } from "../../../libs/toSlug";
import HoverDetailCard from "../../../components/HoverDetailCard";
import useHoverDetailCard from "../../../hooks/useHoverDetailCard";
import useHorizontalScroll from "../../../hooks/useHorizontalScroll";
import ScrollArrow from "./ScrollArrow";

const SectionVietnamHistoryMovies = () => {
  const { data } = useGetListMovie();
  const movie =
    data
      ?.filter(
        (item) =>
          item?.categories === "Lịch sử" &&
          item?.country === "Việt Nam" &&
          item?.categories !== "Hoạt hình",
      )
      ?.sort((a, b) => {
        if (b.year !== a.year) {
          return b.year - a.year; // năm mới trước
        }
        return (b.view || 0) - (a.view || 0); // cùng năm → view cao trước
      })
      ?.slice(0, 10) || [];
  const navigate = useNavigate();

  const { listRef, scrollLeft, scrollRight } = useHorizontalScroll(1200);

  const { activeHover, handleMouseEnter, handleMouseLeave, clearTimeoutHover } =
    useHoverDetailCard();

  return (
    <>
      <section className="text-white lg:pt-5 pb-5 relative">
        <h1 className="text-xl lg:text-2xl font-semibold">
          Tự hào tinh thần Việt
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
                className="rounded-2xl w-47 h-65 lg:w-65 lg:h-90"
                src={item.poster}
                alt=""
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
    </>
  );
};

export default SectionVietnamHistoryMovies;
