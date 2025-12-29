import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useGetDetailMovie from "../hooks/useGetDetailMovie";
import { Link } from "react-router-dom";
import { toSlug } from "../libs/toSlug";

const DetailMovie = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [activeTab, setActiveTab] = useState("episodes");

  const { data: movie } = useGetDetailMovie(id);

  return (
    <>
      <div className="relative w-full min-h-screen overflow-hidden text-white">
        <div className="relative w-full">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out"
            style={{ backgroundImage: `url(${movie?.poster})` }}
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/70 to-black/50"></div>
            <div className="absolute inset-0 bg-black/20"></div>
          </div>

          {/* Content Container */}
          <div className="relative z-10 min-h-screen">
            {/* Breadcrumb Navigation */}
            <div className="pt-20 pb-8 px-4 md:px-8 lg:px-16">
              <nav className="flex items-center gap-2 text-sm text-gray-300 mt-10">
                <Link
                  to="/"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  <span>FilmVoDong</span>
                </Link>
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-white font-medium">{movie?.name}</span>
              </nav>
            </div>

            {/* Main Content */}
            <div className="px-4 md:px-8 lg:px-16 pb-16">
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Movie Poster - Left Side */}
                <div className="shrink-0 w-full lg:w-auto">
                  <img
                    className="w-48 md:w-56 lg:w-64 h-auto object-cover rounded-lg shadow-2xl"
                    src={movie?.image}
                    alt={movie?.name}
                  />
                  <div className="flex flex-wrap items-center gap-2 mt-6">
                    {/* Watch Now Button */}
                    <button
                      onClick={() =>
                        navigate(`/watch/${toSlug(movie.name)}?id=${movie.id}`)
                      }
                      className="flex items-center gap-2 cursor-pointer bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                      <span>Xem Ngay</span>
                    </button>

                    {/* Trailer Button */}
                    <button className="flex items-center cursor-pointer gap-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold px-4 py-3 rounded-lg transition-all duration-300">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                      <span>Trailer</span>
                    </button>
                  </div>
                </div>

                {/* Movie Info and Actions - Right Side */}
                <div className="flex-1 w-full">
                  {/* Movie Title */}
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                      {movie?.name}
                    </h1>
                    {/* Action Icons */}
                    <div className="flex items-center gap-4 ml-auto">
                      {/* Favorite */}
                      <button className="flex flex-col items-center gap-1 text-gray-300 hover:text-white transition-colors group">
                        <svg
                          className="w-6 h-6 group-hover:scale-110 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                        <span className="text-xs">Yêu thích</span>
                      </button>

                      {/* Add to */}
                      <button className="flex flex-col items-center gap-1 text-gray-300 hover:text-white transition-colors group">
                        <svg
                          className="w-6 h-6 group-hover:scale-110 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                        <span className="text-xs">Thêm vào</span>
                      </button>

                      {/* Share */}
                      <button className="flex flex-col items-center gap-1 text-gray-300 hover:text-white transition-colors group">
                        <svg
                          className="w-6 h-6 group-hover:scale-110 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                          />
                        </svg>
                        <span className="text-xs">Chia sẻ</span>
                      </button>

                      {/* Comment */}
                      <button className="flex flex-col items-center gap-1 text-gray-300 hover:text-white transition-colors group">
                        <svg
                          className="w-6 h-6 group-hover:scale-110 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                        <span className="text-xs">Bình luận</span>
                      </button>
                    </div>
                  </div>

                  {/* Movie Details */}
                  <div className="space-y-4 mb-8 text-gray-300">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">
                        Thời lượng:
                      </span>
                      <span>
                        {movie?.hour} giờ {movie?.minute} phút
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">
                        Quốc gia:
                      </span>
                      <span>{movie?.country}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">
                        Thể loại:
                      </span>
                      <span>{movie?.categories}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">
                        Đạo diễn:
                      </span>
                      <span>{movie?.director}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <p className="font-semibold text-white whitespace-nowrap">
                        Diễn viên:
                      </p>
                      <span>{movie?.cast}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-8">
                    <p className="font-semibold text-white mb-2">
                      Nội dung phim:
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                      {movie?.description}
                    </p>
                  </div>

                  {/* Navigation Tabs */}
                  <div className="border-b border-gray-700 mb-6">
                    <nav className="flex gap-8">
                      <button
                        onClick={() => setActiveTab("episodes")}
                        className={`pb-4 px-2 font-semibold transition-colors ${
                          activeTab === "episodes"
                            ? "text-white border-b-2 border-white"
                            : "text-gray-400 hover:text-white"
                        }`}
                      >
                        Tập phim
                      </button>
                      <button
                        onClick={() => setActiveTab("suggestions")}
                        className={`pb-4 px-2 font-semibold transition-colors ${
                          activeTab === "suggestions"
                            ? "text-white border-b-2 border-white"
                            : "text-gray-400 hover:text-white"
                        }`}
                      >
                        Đề xuất
                      </button>
                    </nav>
                  </div>

                  {/* Tab Content */}
                  <div className="min-h-50">
                    {activeTab === "episodes" && (
                      <div className="text-gray-300">
                        <p>Danh sách tập phim sẽ được hiển thị ở đây...</p>
                      </div>
                    )}
                    {activeTab === "suggestions" && (
                      <div className="text-gray-300">
                        <p>Đề xuất phim tương tự sẽ được hiển thị ở đây...</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailMovie;
