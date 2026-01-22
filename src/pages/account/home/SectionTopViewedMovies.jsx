import React from "react";
import useGetListMovie from "../../../hooks/useGetListMovie";
import HoverDetailCard from "../../../components/HoverDetailCard";
import { toSlug } from "../../../libs/toSlug";
import { useNavigate } from "react-router-dom";
import useHoverDetailCard from "../../../hooks/useHoverDetailCard";
import useHorizontalScroll from "../../../hooks/useHorizontalScroll";
import ScrollArrow from "./ScrollArrow";

const gradients = [
  "from-[#8F8AE8] via-[#A8A4F0]/20 to-transparent", // tím xanh
  "from-[#6FBFAE] via-[#8BC9BC]/20 to-transparent", // xanh mint
  "from-[#C89A80] via-[#D4AC94]/20 to-transparent", // cam nâu
  "from-[#A67878] via-[#B98C8C]/20 to-transparent", // đỏ pastel
  "from-[#7C8694] via-[#9AA3AD]/20 to-transparent", // xám xanh
  "from-[#9B8BE5] via-[#B2A2EE]/20 to-transparent", // tím lavender
  "from-[#8E5A9E] via-[#B48CC6]/20 to-transparent", // tím hồng
  "from-[#5F8FBF] via-[#8FB3D9]/20 to-transparent", // xanh dương
  "from-[#B68C5A] via-[#D2B48C]/20 to-transparent", // vàng nâu
  "from-[#5E9E8C] via-[#84BDB0]/20 to-transparent", // xanh ngọc
];

const SectionTopViewedMovies = () => {
  const { data } = useGetListMovie();
  const movie = data?.sort((a, b) => b?.view - a?.view)?.slice(0, 10) || [];
  const navigate = useNavigate();

  const { listRef, scrollLeft, scrollRight } = useHorizontalScroll(1200);

  const { activeHover, handleMouseEnter, handleMouseLeave, clearTimeoutHover } =
    useHoverDetailCard();

  return (
    <>
      <section className="text-white lg:pt-5 pb-5 relative">
        <h1 className="text-xl lg:text-2xl font-semibold">
          Top 10 phim xem nhiều nhất
        </h1>

        <ul
          ref={listRef}
          className="mt-5 flex flex-nowrap overflow-x-auto scroll-smooth pb-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden gap-4 md:gap-3 lg:gap-5"
        >
          {movie?.map((item, index) => (
            <li
              key={item.id}
              onClick={() =>
                navigate(`/movie/${toSlug(item.name)}?id=${item.id}`)
              }
              className="flex items-center justify-center shrink-0 relative cursor-pointer"
              onMouseEnter={(e) => handleMouseEnter(e, item)}
              onMouseLeave={handleMouseLeave}
            >
              <img
                className="rounded-2xl w-47 h-65 lg:w-65 lg:h-90"
                src={item?.poster}
                alt=""
              />

              <div
                className={`absolute top-0 w-full h-2/3 bg-linear-to-b from-5% rounded-t-2xl ${gradients[index % gradients.length]}`}
              ></div>

              <div className="flex items-center gap-1 absolute top-2 right-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5
                        c4.478 0 8.268 2.943 9.542 7
                        -1.274 4.057-5.064 7-9.542 7
                        -4.477 0-8.268-2.943-9.542-7z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <p className="lg:text-sm text-[10px]">{item?.view} view</p>
              </div>

              <div
                className={`absolute bottom-0 w-full h-2/3 bg-linear-to-t from-40% rounded-b-2xl ${gradients[index % gradients.length]}`}
              ></div>
              <div className="absolute top-3/5 left-5 right-5">
                <p
                  className="font-black text-6xl lg:text-8xl leading-none text-white/30"
                  style={{
                    WebkitTextStroke: "1px rgba(255, 255, 255, 0.5)", // Viền trắng mảnh mờ
                    filter:
                      "drop-shadow(0 0 5px rgba(255,255,255,0.6)) drop-shadow(0 0 2px rgba(255,255,255,0.4))", // Tạo độ mờ tỏa nhẹ từ viền
                  }}
                >
                  {index + 1}
                </p>
                <p className="line-clamp-2 wrap-break-word font-semibold leading-snug text-sm lg:text-base">
                  {item.name}
                </p>
              </div>
            </li>
          ))}
        </ul>

        {/* RENDER CARD - Quan trọng: Phải có cả onMouseEnter ở đây */}
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

export default SectionTopViewedMovies;
