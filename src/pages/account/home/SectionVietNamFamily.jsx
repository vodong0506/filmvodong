import React, { useRef, useState } from "react";
import useGetListMovie from "../../../hooks/useGetListMovie";
import { useNavigate } from "react-router-dom";
import { toSlug } from "../../../libs/toSlug";
import HoverDetailCard from "../../../components/HoverDetailCard";

const SectionVietNamFamily = () => {
  const { data } = useGetListMovie();
  const movie =
    data
      ?.filter(
        (item) =>
          item?.categories === "Tình cảm" &&
          item?.country === "Việt Nam" &&
          item?.categories !== "Hoạt hình",
      )
      .sort((a, b) => b.year - a.year)
      ?.slice(0, 10) || [];
  const navigate = useNavigate();
  const listRef = useRef(null);

  const scrollLeft = () => {
    listRef.current?.scrollBy({
      left: -600,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    listRef.current?.scrollBy({
      left: 600,
      behavior: "smooth",
    });
  };

  const [activeHover, setActiveHover] = useState({
    show: false,
    movie: null,
    pos: null,
  });
  const timeoutRef = useRef(null); // Ref này cực kỳ quan trọng để quản lý thời gian

  const handleMouseEnter = (e, item) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (activeHover.show) {
      const rect = e.currentTarget.getBoundingClientRect();
      setActiveHover({
        show: true,
        movie: item,
        pos: {
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
        },
      });
      return; // Thoát hàm, không chạy bộ đếm 1s nữa
    }

    // 3. NẾU CHƯA HIỆN CARD: Đợi đúng 1s mới hiện (như logic cũ của bạn)
    const rect = e.currentTarget.getBoundingClientRect();
    const absolutePos = {
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
    };

    timeoutRef.current = setTimeout(() => {
      setActiveHover({
        show: true,
        movie: item,
        pos: absolutePos,
      });
    }, 700);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setActiveHover((prev) => ({ ...prev, show: false }));
    }, 0);
  };

  return (
    <>
      <section className="text-white lg:pt-5 pb-10 relative">
        <h1 className="text-xl lg:text-2xl font-semibold">
          Khoảnh Khắc Bên Người Thân
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

        {/* RENDER CARD - Quan trọng: Phải có cả onMouseEnter ở đây */}
        {activeHover.show && (
          <HoverDetailCard
            movie={activeHover.movie}
            position={activeHover.pos}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => {
              // Khi chuột đã vào bên trong Card, xóa lệnh "đóng card" (timeout 300ms ở trên)
              if (timeoutRef.current) clearTimeout(timeoutRef.current);
            }}
          />
        )}

        <div className="hidden lg:block">
          <button
            onClick={scrollLeft}
            className="absolute bottom-2/5 -left-20 cursor-pointer"
          >
            <svg
              className={`w-10 h-10 text-white transition-transform duration-300 rotate-90`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <button
            onClick={scrollRight}
            className="absolute bottom-2/5 -right-20 cursor-pointer"
          >
            <svg
              className={`w-10 h-10 text-white transition-transform duration-300 -rotate-90`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </section>
    </>
  );
};

export default SectionVietNamFamily;
