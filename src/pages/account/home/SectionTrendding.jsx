import React, { useRef, useState } from "react";
import useGetListMovie from "../../../hooks/useGetListMovie";
import HoverDetailCard from "../../../components/HoverDetailCard";
import { toSlug } from "../../../libs/toSlug";
import { useNavigate } from "react-router-dom";

const gradients = [
  "from-[#8F8AE8] via-[#A8A4F0]/60 to-transparent", // tím xanh
  "from-[#6FBFAE] via-[#8BC9BC]/60 to-transparent", // xanh mint
  "from-[#C89A80] via-[#D4AC94]/60 to-transparent", // cam nâu
  "from-[#A67878] via-[#B98C8C]/60 to-transparent", // đỏ pastel
  "from-[#7C8694] via-[#9AA3AD]/60 to-transparent", // xám xanh
  "from-[#9B8BE5] via-[#B2A2EE]/60 to-transparent", // tím lavender
  "from-[#8E5A9E] via-[#B48CC6]/60 to-transparent", // tím hồng
  "from-[#5F8FBF] via-[#8FB3D9]/60 to-transparent", // xanh dương
  "from-[#B68C5A] via-[#D2B48C]/60 to-transparent", // vàng nâu
  "from-[#5E9E8C] via-[#84BDB0]/60 to-transparent", // xanh ngọc
];

const SectionTrendding = () => {
  const { data: movie } = useGetListMovie();
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
      <section className="text-white pt-5 lg:pt-10 pb-10 relative">
        <h1 className="text-xl lg:text-2xl font-semibold">
          Top 10 phim xu hướng
        </h1>

        <ul
          ref={listRef}
          className="mt-5 flex flex-nowrap overflow-x-auto scroll-smooth pb-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden gap-4 md:gap-3 lg:gap-5"
        >
          {movie?.slice(0, 10).map((item, index) => (
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
                className="rounded-2xl w-47 h-65 lg:w-65 lg:h-95"
                src={item?.image}
                alt=""
              />

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

export default SectionTrendding;
