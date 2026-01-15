import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useGetDetailMovie from "../hooks/useGetDetailMovie";
import { Link } from "react-router-dom";
import { toSlug } from "../libs/toSlug";
import CommentVideo from "./CommentVideo";
import useGetListMovie from "../hooks/useGetListMovie";
import Footer from "../components/Footer";

const DetailMovie = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const { data: movie } = useGetDetailMovie(id);
  const { data: listMovie } = useGetListMovie();
  const sameGenreMovies =
    listMovie?.filter(
      (mov) => mov?.categories === movie?.categories && mov.id !== movie?.id
    ) || [];

  const [activeTab, setActiveTab] = useState("suggestions");

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [id]);

  return (
    <>
      <div
        className="w-full h-screen relative bg-center bg-cover"
        style={{ backgroundImage: `url(${movie?.poster})` }}
      >
        <div
          className="absolute inset-0 bg-linear-to-r 
            from-[rgb(13,13,12)] mask-l-from-30%
            via-black/60 via-50% 
            to-[rgb(13,13,12)] mask-r-from-30%"
        ></div>

        <div className="relative z-10 bg-linear-to-t from-[rgb(13,13,12)] from-69% to-[rgb(13,13,12)]/10 w-full text-white px-30 pt-80 pb-30">
          <div className="flex items-start gap-20 mt-80">
            <div className="w-1/3">
              <img className="w-50 rounded-2xl" src={movie?.image} alt="" />
              <p className="mt-5 text-3xl font-semibold">{movie?.name}</p>
              <div className="flex gap-3 items-start mt-5 flex-wrap">
                <p className="px-4 py-2 bg-white text-black border border-white text-[10px] font-semibold w-fit rounded-2xl mt-2">
                  HD - Full HD
                </p>
                <p className="px-4 py-2 bg-transparent border border-white text-[10px] font-semibold w-fit rounded-2xl mt-2">
                  {movie?.year}
                </p>
                <p className="px-4 py-2 bg-transparent border border-white text-[10px] font-semibold w-fit rounded-2xl mt-2">
                  {movie?.hour} giờ {movie?.minute} phút
                </p>
                <p className="px-4 py-2 bg-transparent border border-white text-[10px] font-semibold w-fit rounded-2xl mt-2">
                  {movie?.categories}
                </p>
                <p className="px-4 py-2 bg-transparent border border-white text-[10px] font-semibold w-fit rounded-2xl mt-2">
                  {movie?.country}
                </p>
              </div>

              <div className="mt-5 p-3 rounded-2xl bg-orange-500/30 w-fit">
                <p className="text-[12px]">Đang chiếu: Trailer</p>
              </div>

              <div>
                <h3 className="text-xl mt-5">
                  Giới thiệu phim - {movie?.name}
                </h3>
                <p className="mt-2 text-gray-500 text-sm">
                  {movie?.description}
                </p>
              </div>

              <div className="space-y-4 mb-8 text-gray-300 mt-5">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white text-sm">
                    Thời lượng:
                  </span>
                  <span className="text-sm">
                    {movie?.hour} giờ {movie?.minute} phút
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white text-sm">
                    Quốc gia:
                  </span>
                  <span className="text-sm">{movie?.country}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white text-sm">
                    Thể loại:
                  </span>
                  <span className="text-sm">{movie?.categories}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white text-sm">
                    Đạo diễn:
                  </span>
                  <span className="text-sm">{movie?.director}</span>
                </div>
                <div className="flex items-start gap-2">
                  <p className="font-semibold text-white whitespace-nowrap">
                    Diễn viên:
                  </p>
                  <span className="text-sm">{movie?.cast}</span>
                </div>
              </div>
            </div>

            <div className="w-2/3">
              <div className="flex items-center justify-between">
                <button
                  onClick={() =>
                    navigate(`/watch/${toSlug(movie?.name)}?id=${movie?.id}`)
                  }
                  className="flex items-center gap-2 cursor-pointer bg-red-600 hover:bg-red-700 text-white text-xl font-semibold px-6 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                  <span>Xem Ngay</span>
                </button>

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

              <div className="border-b border-gray-700 mt-15">
                <nav className="flex gap-8">
                  <button
                    onClick={() => setActiveTab("suggestions")}
                    className={`pb-4 px-2 font-semibold transition-colors text-sm cursor-pointer ${
                      activeTab === "suggestions"
                        ? "text-white border-b-2 border-white"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Đề xuất
                  </button>

                  <button
                    onClick={() => setActiveTab("episodes")}
                    className={`pb-4 px-2 font-semibold transition-colors text-sm cursor-pointer ${
                      activeTab === "episodes"
                        ? "text-white border-b-2 border-white"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Tập phim
                  </button>
                </nav>
              </div>

              <div className="mt-10">
                {activeTab === "episodes" && (
                  <div>
                    <div>
                      <p className="font-semibold text-xl">Các bản chiếu</p>
                      <div
                        className="w-90 h-40 relative bg-center bg-cover mt-5 rounded-xl overflow-hidden"
                        style={{ backgroundImage: `url(${movie?.poster})` }}
                      >
                        <div className="absolute inset-0 bg-linear-to-r from-gray-500 from-50% to-transparent"></div>
                        <div className="relative p-5 flex flex-col justify-between h-full">
                          <p className="text-sm font-semibold">
                            {movie?.language}
                          </p>
                          <p className="text-sm font-semibold">Trailer</p>
                          <button
                            onClick={() =>
                              navigate(
                                `/watch/${toSlug(movie?.name)}?id=${movie?.id}`
                              )
                            }
                            className="text-sm font-semibold w-fit bg-white rounded-2xl text-black px-4 py-2 cursor-pointer hover:scale-105 transition duration-300"
                          >
                            Xem bản này
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === "suggestions" && (
                  <ul className="mt-10 flex items-center gap-7 flex-wrap">
                    {sameGenreMovies?.map((item) => (
                      <li
                        key={item?.id}
                        onClick={() =>
                          navigate(
                            `/movie/${toSlug(item?.name)}?id=${item?.id}`
                          )
                        }
                        className="relative w-fit group"
                      >
                        <img
                          className="w-40 rounded-2xl"
                          src={item.image}
                          alt=""
                        />
                        <p className="absolute bottom-2 left-1/3 p-2 rounded-md text-xs bg-green-700 font-bold">
                          Trailer
                        </p>
                        <div className="absolute bg-transparent group-hover:bg-black/20 inset-0 transition duration-300 cursor-pointer"></div>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-15 border border-white/30 rounded-2xl px-7 py-7 bg-[rgb(14,14,12)]">
                  <CommentVideo />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="inset-0">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default DetailMovie;
