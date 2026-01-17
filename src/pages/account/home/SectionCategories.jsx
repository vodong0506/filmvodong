import React, { useRef } from "react";
import useGetListCategory from "../../../hooks/useGetListCategory";

const gradients = [
  "bg-gradient-to-br from-[#8F8AE8]/80 via-[#A8A4F0]/70 to-[#E6B7C8]/80",
  "bg-gradient-to-br from-[#7C8694]/80 via-[#9AA3AD]/70 to-[#E7B3B3]/80",
  "bg-gradient-to-br from-[#6FBFAE]/80 via-[#8BC9BC]/70 to-[#E1C1BA]/80",
  "bg-gradient-to-br from-[#9B8BE5]/80 via-[#B2A2EE]/70 to-[#E7B7C8]/80",
  "bg-gradient-to-br from-[#C89A80]/80 via-[#D4AC94]/70 to-[#E8B8AA]/80",
  "bg-gradient-to-br from-[#A67878]/80 via-[#B98C8C]/70 to-[#E3B2B2]/80",
];

const SectionCategories = () => {
  const { data: category } = useGetListCategory();
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

  return (
    <section className="bg-[rgb(13,13,12)] text-white pt-10 relative">
      <h1 className="text-xl lg:text-2xl font-semibold">
        Bạn đang quan tâm gì?
      </h1>

      <ul
        ref={listRef}
        className="lg:mt-2 py-5 flex flex-nowrap overflow-x-auto scroll-smooth pb-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden gap-2 md:gap-3 lg:gap-5"
      >
        {category?.map((item, index) => (
          <li
            key={item.id}
            className={`
               ${gradients[index % gradients.length]}
              lg:w-66 lg:h-35 w-35 h-20 md:w-38 md:h-23
              rounded-xl
              flex items-center justify-center
              shadow-lg
              hover:-translate-y-2 transition duration-300
              cursor-pointer
              relative
              shrink-0
            `}
          >
            <p className="font-semibold text-sm md:text-md lg:text-xl text-center">
              {item.name}
            </p>
            <div className="absolute lg:bottom-5 lg:left-1/3 lg:flex items-center gap-1 hidden">
              <p className="text-xs">Xem chủ đề</p>
              <svg
                className={`w-4 h-4 text-white transition-transform duration-300 -rotate-90`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </li>
        ))}
      </ul>

      <div className="hidden lg:block">
        <button
          onClick={scrollLeft}
          className="absolute bottom-1/4 -left-20 cursor-pointer"
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
          className="absolute bottom-1/4 -right-20 cursor-pointer"
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
  );
};

export default SectionCategories;
