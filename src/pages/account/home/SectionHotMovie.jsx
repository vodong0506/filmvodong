import React, { useState, useEffect } from "react";
import useGetListMovie from "../../../hooks/useGetListMovie";
import { useNavigate } from "react-router-dom";
import { toSlug } from "../../../libs/toSlug";

const SectionHotMovie = () => {
  const { data, isLoading } = useGetListMovie();
  const [currentIndex, setCurrentIndex] = useState(0);
  const movies = data?.filter((item) => item?.hot === true)?.slice(0, 8) || [];
  const navigate = useNavigate();

  // Auto slide every 15 seconds
  useEffect(() => {
    if (movies.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 15000);
    return () => clearInterval(interval);
  }, [movies.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % movies.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  if (isLoading || movies.length === 0) {
    return (
      <section className="w-full h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-xl">Đang tải...</div>
      </section>
    );
  }

  const currentMovie = movies[currentIndex];

  return (
    <section className="relative w-full h-[70vh] md:h-[80vh] lg:h-screen overflow-hidden">
      {/* Main Featured Movie - 2/3 screen */}
      <div className="relative w-full h-full">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out animate-fade-in"
          style={{ backgroundImage: `url(${currentMovie.poster})` }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-transparent"></div>
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="w-full md:w-2/3 px-17 lg:px-20">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-2xl animate-slide-in-left">
              {currentMovie.name}
            </h1>
            {currentMovie.description && (
              <p className="text-white/90 text-lg md:text-xl mb-6 line-clamp-3 max-w-2xl drop-shadow-lg animate-slide-in-right">
                {currentMovie.description}
              </p>
            )}

            {/* Play Button */}
            <button
              onClick={() =>
                navigate(
                  `/movie/${toSlug(currentMovie.name)}?id=${currentMovie.id}`
                )
              }
              className="group cursor-pointer flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
              Phát ngay
            </button>
          </div>
        </div>

        {/* Navigation Arrows */}
        {movies.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 group"
              aria-label="Phim trước"
            >
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 group"
              aria-label="Phim tiếp theo"
            >
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Navigation - Bottom */}
      {movies.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-leanear-to-t from-black/80 to-transparent py-4">
          <div className="flex justify-center gap-3 px-4">
            {movies.map((movie, index) => (
              <button
                key={movie.id}
                onClick={() => goToSlide(index)}
                className={`relative w-20 h-12 md:w-24 md:h-14 rounded overflow-hidden transition-all duration-300 ${
                  index === currentIndex
                    ? "ring-2 ring-red-500 scale-110"
                    : "opacity-60 hover:opacity-100 hover:scale-105"
                }`}
                aria-label={`Chuyển đến ${movie.name}`}
              >
                <img
                  src={movie.poster}
                  alt={movie.name}
                  className="w-full h-full object-cover"
                />
                {index === currentIndex && (
                  <div className="absolute inset-0 bg-red-500/20"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default SectionHotMovie;
