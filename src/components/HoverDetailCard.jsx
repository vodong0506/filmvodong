import React from "react";
import { createPortal } from "react-dom";

const HoverDetailCard = ({ movie, position, onMouseLeave, onMouseEnter }) => {
  if (!movie || !position) return null;

  return createPortal(
    <div
      className="fixed z-[9999] w-85 rounded-xl bg-[#181818] shadow-2xl overflow-hidden pointer-events-auto"
      onMouseEnter={onMouseEnter} // Giữ card đứng yên khi chuột ở đây
      onMouseLeave={onMouseLeave} // Đóng card khi chuột rời khỏi đây
      style={{
        top: position.top,
        left: position.left,
        transform: "translate(0, -15%) scale(1.15)", // Phóng to để tạo hiệu ứng Netflix
        transition: "transform 0.3s ease, opacity 0.3s ease",
      }}
    >
      <div className="relative">
        <img src={movie.image} className="w-full h-44 object-cover" alt="" />
        {/* Lớp phủ gradient nhẹ cho ảnh mượt hơn */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#181818] to-transparent" />
      </div>

      <div className="p-4 text-white">
        <h3 className="font-bold text-lg leading-tight">{movie.name}</h3>
        <div className="flex items-center gap-2 mt-2 text-xs">
          <span className="text-green-400 font-bold text-sm">
            98% Trùng khớp
          </span>
          <span className="text-zinc-400 border border-zinc-500 px-1">16+</span>
          <span className="text-zinc-400">4 Mùa</span>
        </div>

        <p className="text-sm text-zinc-300 mt-3 line-clamp-3 leading-snug">
          {movie.description}
        </p>

        <div className="mt-4 flex gap-2">
          <button className="bg-white text-black px-6 py-2 rounded font-bold text-sm hover:bg-zinc-200 transition cursor-pointer">
            ▶ Xem ngay
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default HoverDetailCard;
