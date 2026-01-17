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

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  if (isLoading || movies.length === 0) {
    return (
      <section className="w-full h-screen flex items-center justify-center bg-[rgb(13,13,12)]">
        <div className="text-white text-7xl font-bold">VoDong...</div>
      </section>
    );
  }

  const currentMovie = movies[currentIndex];

  const handleBackgroundClick = () => {
    if (window.innerWidth < 1024) {
      navigate(`/movie/${toSlug(currentMovie.name)}?id=${currentMovie.id}`);
    }
  };

  return (
    <section className="relative w-full h-[40vh] lg:h-screen">
      {/* Main Featured Movie - 2/3 screen */}
      <div onClick={handleBackgroundClick} className="relative w-full h-full">
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
          <div className="w-full lg:w-2/3 px-8 md:px-15 lg:px-20 mt-20 min-[390px]:mt-35 min-[430px]:mt-43 md:mt-35 flex flex-col justify-center items-center lg:block">
            <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold text-white mb-2 md:mb-4 drop-shadow-2xl animate-slide-in-left font-name-movie">
              {currentMovie.name}
            </h1>
            <p
              className="text-yellow-500
             text-xs font-light md:text-md mb-4 md:mb-6 line-clamp-3 max-w-2xl drop-shadow-lg animate-slide-in-right"
            >
              Hot nhất
            </p>
            <div className="mb-6 flex flex-wrap gap-3 items-center">
              <p className="px-2 py-1 md:px-4 md:py-2 border border-white/50 bg-white text-black text-[8px] md:text-[10px] lg:text-xs md:font-semibold w-fit rounded-2xl">
                HD - Vietsub
              </p>
              <p className="px-2 py-1 md:px-4 md:py-2 bg-transparent border border-white/50 text-white text-[7px] md:text-[10px] lg:text-xs md:font-semibold w-fit rounded-2xl">
                {currentMovie?.year}
              </p>
              <p className="px-2 py-1 md:px-4 md:py-2 bg-transparent border border-white/50 text-white text-[7px] md:text-[10px] lg:text-xs md:font-semibold w-fit rounded-2xl">
                {currentMovie?.hour} giờ {currentMovie?.minute} phút
              </p>
              <p className="px-2 py-1 md:px-4 md:py-2 bg-transparent border border-white/50 text-white text-[7px] md:text-[10px] lg:text-xs md:font-semibold w-fit rounded-2xl">
                {currentMovie?.categories}
              </p>
            </div>
            {currentMovie.description && (
              <p className="hidden lg:block text-white/90 text-sm md:text-md mb-6 line-clamp-3 max-w-2xl drop-shadow-lg animate-slide-in-right">
                {currentMovie.description.slice(0, 300) + "..."}
              </p>
            )}

            {/* Play Button */}
            <div className="flex items-center gap-5 lg:gap-10 mt-5">
              <button
                onClick={() =>
                  navigate(
                    `/watch/${toSlug(currentMovie.name)}?id=${currentMovie.id}`,
                  )
                }
                className="group cursor-pointer bg-red-600 hover:bg-red-700 text-white p-4 md:p-5 rounded-full transition-all duration-300 transform hover:scale-105 shadow-sm shadow-red-300 hover:shadow-md hidden lg:block"
              >
                <svg
                  className="w-5 h-5 lg:w-8 lg:h-8"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </button>
              <div className="flex items-center bg-white/10 backdrop-blur-md rounded-full overflow-hidden border border-white/10">
                {/* HEART */}
                <button
                  className="px-5 py-3 hover:bg-white/10 transition-all cursor-pointer hidden lg:block"
                  title="Yêu thích"
                >
                  <svg
                    className="w-4 h-4 lg:w-7 lg:h-7 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 18.657 3.172 10.828a4 4 0 010-5.656z" />
                  </svg>
                </button>

                {/* DIVIDER */}
                <div className="w-px h-6 bg-white/20 hidden lg:block"></div>

                {/* DETAIL */}
                <button
                  onClick={() =>
                    navigate(
                      `/movie/${toSlug(currentMovie.name)}?id=${
                        currentMovie.id
                      }`,
                    )
                  }
                  className="px-5 py-3 hover:bg-white/10 transition-all cursor-pointer hidden lg:block"
                  title="Chi tiết"
                >
                  <svg
                    className="w-4 h-4 lg:w-7 lg:h-7 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 9h2v6H9V9zm1-7a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Thumbnail Navigation - Bottom */}
      {movies.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-linear-to-t from-[rgb(13,13,12)] from-50% to-transparent py-4">
          <div className="flex justify-center gap-3 px-4">
            {movies.map((movie, index) => (
              <button
                key={movie.id}
                onClick={() => goToSlide(index)}
                className={`relative w-13 h-9 md:w-20 md:h-12 rounded overflow-hidden transition-all duration-300 ${
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
