import React from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { toSlug } from "../libs/toSlug";

const HoverDetailCard = ({ movie, position, onMouseLeave, onMouseEnter }) => {
  const navigate = useNavigate();
  if (!movie || !position) return null;

  return createPortal(
    <div
      className="absolute z-9999 w-70 h-100 rounded-xl bg-[#181818] shadow-2xl overflow-hidden pointer-events-auto animate-fadeIn-hover hidden lg:block"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        top: position.top,
        left: position.left,
        marginTop: "-40px",
        pointerEvents: "auto",
        // Thêm dòng này để card trượt mượt mà khi thay đổi vị trí giữa các item
        transition: "top 0.3s ease, left 0.3s ease, transform 0.3s ease",
      }}
    >
      <div className="relative h-44">
        <img
          src={movie.poster}
          className="w-full h-full object-cover"
          alt={movie.name}
        />
        {/* Dùng CSS Gradient chuẩn cho Tailwind v3/v4 */}
        <div className="absolute inset-0 bg-linear-to-t from-[#181818] to-transparent" />
      </div>

      <div className="p-4 text-white mt-3">
        <h3 className="font-bold text-lg leading-tight line-clamp-1">
          {movie.name}
        </h3>

        <div className="mt-2 flex items-center gap-2">
          <p className="border border-white/50 rounded-md text-[10px] w-fit p-1">
            {movie?.year}
          </p>
          <p className="border border-white/50 rounded-md text-[10px] w-fit p-1">
            {movie?.country}
          </p>
          <p className="border border-white/50 rounded-md text-[10px] w-fit p-1">
            {movie?.categories}
          </p>
        </div>

        <p className="text-[11px] text-zinc-300 mt-3 line-clamp-3 leading-snug">
          {movie.description}
        </p>

        <div className="mt-5 flex items-center gap-3">
          <button
            onClick={() =>
              navigate(`/watch/${toSlug(movie?.name)}?id=${movie?.id}`)
            }
            className="flex items-center w-full lg:w-fit justify-center gap-2 cursor-pointer bg-linear-to-r from-red-600 to-red-500 hover:bg-red-700 text-white text-sm font-semibold py-3 lg:px-4 lg:py-2 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
            <span>Xem ngay</span>
          </button>

          <button className="border border-white rounded-full p-2 cursor-pointer hover:scale-110 transition duration-300">
            <svg
              className="w-4 h-4 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 18.657 3.172 10.828a4 4 0 010-5.656z" />
            </svg>
          </button>

          <button
            onClick={() =>
              navigate(`/movie/${toSlug(movie.name)}?id=${movie.id}`)
            }
            className="border border-white rounded-full p-2 cursor-pointer hover:scale-110 transition duration-300"
          >
            <svg
              className="w-4 h-4 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9 9h2v6H9V9zm1-7a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
            </svg>
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default HoverDetailCard;
