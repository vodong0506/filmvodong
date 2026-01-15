import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import useGetDetailMovie from "../hooks/useGetDetailMovie";
import ico_loadding from "../assets/icon_loadding.gif";
import { Link } from "react-router-dom";
import ico_user from "../assets/ico_user.png";

const WatchMovie = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const id = searchParams.get("id");
  const { data: movie, isLoading } = useGetDetailMovie(id);
  const [showFull, setShowFull] = useState(false);

  // Convert Google Drive URL to embeddable format
  const convertGoogleDriveUrl = (url) => {
    if (!url) return "";

    // Extract file ID from Google Drive URL
    const fileIdMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (fileIdMatch) {
      return `https://drive.google.com/file/d/${fileIdMatch[1]}/preview`;
    }

    // If already in preview format, return as is
    if (url.includes("/preview")) {
      return url;
    }

    return url;
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <img src={ico_loadding} alt="Loading" className="w-16 h-16" />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50 text-white">
        <div className="text-center">
          <p className="text-xl mb-4">Không tìm thấy phim</p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
          >
            Về trang chủ
          </button>
        </div>
      </div>
    );
  }

  const videoUrl = convertGoogleDriveUrl(movie.url);

  return (
    <div className="min-h-screen bg-[rgb(18,19,28)] py-8 px-4 text-white">
      <div className="pt-10 pb-8 px-4 md:px-8">
        <nav className="flex items-center gap-2 text-xs md:text-sm text-gray-300 mt-10">
          <Link
            to="/"
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <span>FilmVoDong</span>
          </Link>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-white font-medium">{movie?.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Video Player */}
        <h2 className="font-semibold text-xl lg:text-2xl mb-5">
          Xem phim {movie.name}
        </h2>
        <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl">
          {videoUrl ? (
            <iframe
              src={videoUrl}
              className="w-full h-full"
              allow="autoplay; fullscreen"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white text-center bg-gray-900">
              <div>
                <p className="text-xl mb-4">Không có video</p>
                <button
                  onClick={() => navigate(-1)}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                >
                  Quay lại
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="lg:px-75 mt-10 lg:mt-15">
        <div className="flex gap-5">
          <img className="w-40 md:w-50" src={movie?.image} alt="image movie" />
          <div>
            <p className="font-semibold text-xl">{movie?.name}</p>
            <div className="mt-5">
              <p className="px-4 py-2 bg-white text-black text-xs md:text-xs font-semibold w-fit rounded-2xl">
                HD - Vietsub
              </p>
              <p className="px-4 py-2 bg-transparent border border-white text-xs md:text-xs font-semibold w-fit rounded-2xl mt-2">
                {movie?.year}
              </p>
              <p className="px-4 py-2 bg-transparent border border-white text-xs md:text-xs font-semibold w-fit rounded-2xl mt-2">
                {movie?.hour} giờ {movie?.minute} phút
              </p>
              <p className="px-4 py-2 bg-transparent border border-white text-xs md:text-xs font-semibold w-fit rounded-2xl mt-2">
                {movie?.categories}
              </p>
              <p className="px-4 py-2 bg-transparent border border-white text-xs md:text-xs font-semibold w-fit rounded-2xl mt-2">
                {movie?.country}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <p className="text-gray-500 text-sm">
            {showFull
              ? movie?.description
              : movie?.description?.slice(0, 400) + "..."}
          </p>
          {movie?.description?.length > 400 && (
            <button
              onClick={() => setShowFull(!showFull)}
              className="text-yellow-500 text-sm mt-2 hover:underline cursor-pointer"
            >
              {showFull ? "Thu gọn" : "Xem thêm"}
            </button>
          )}
        </div>

        <div className="mt-10">
          <h2 className="font-semibold text-xl">Diễn viên</h2>
          <ul className="mt-5 grid grid-cols-3 md:grid-cols-4 gap-6">
            {movie?.cast?.split(",").map((actor, index) => (
              <li key={index} className="text-center">
                <img
                  className="w-15 h-15 md:w-20 md:h-20 bg-white rounded-full p-3 mx-auto"
                  src={ico_user}
                  alt={actor.trim()}
                />
                <p className="mt-2 text-sm">{actor.trim()}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WatchMovie;
