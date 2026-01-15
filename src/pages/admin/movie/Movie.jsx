import React, { useEffect, useState } from "react";
import Toast from "../../../components/Toast";
import ico_loadding from "../../../assets/icon_loadding.gif";
import useGetListCategory from "../../../hooks/useGetListCategory";
import {
  createMovie,
  deleteMovie,
  updateMovie,
} from "../../../service/movie-service";
import useGetListMovie from "../../../hooks/useGetListMovie";
import { useSearchParams } from "react-router-dom";
import AddMovie from "./AddMovie";

const Movie = () => {
  const formMovie = {
    name: "",
    hour: "",
    minute: "",
    cast: "",
    categories: "",
    director: "",
    language: "",
    poster: "",
    url: "",
    country: "",
    description: "",
    hot: false,
    image: "",
    year: "",
  };

  const { data } = useGetListCategory();
  const {
    data: listMovie,
    isLoading: isLoadingMovie,
    handleGetList,
  } = useGetListMovie();

  const [movie, setMovie] = useState(formMovie);
  const [toast, setToast] = useState(null);
  const [loadding, setLoadding] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [_selectedId, _setSelectedId] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || 1);
  const itemsPerPage = 10;

  useEffect(() => {
    handleGetList(); // gọi API để lấy tất cả movies
  }, [handleGetList]);

  // Tính toán phân trang
  const totalPages = Math.ceil(listMovie.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const moviesPage = listMovie.slice(startIndex, endIndex);

  const handleChangePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setSearchParams({ page: newPage });
      // Scroll to top khi chuyển trang
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate categories
    if (!movie.categories || movie.categories === "not_select") {
      setToast({ message: "Vui lòng chọn thể loại", type: "error" });
      return;
    }
    setLoadding(true);

    try {
      if (_selectedId) {
        await updateMovie(_selectedId, movie);
        setToast({ message: "Cập nhật phim thành công", type: "success" });
      } else {
        await createMovie(movie);
        setToast({ message: "Thêm phim thành công", type: "success" });
      }
      await handleGetList();
      setLoadding(false);
      setIsModalOpen(false);
      setMovie(formMovie);
      // Reset về trang 1 sau khi thêm phim mới
      setSearchParams({ page: 1 });
    } catch (error) {
      console.error(error);
      setToast({ message: "Thêm phim thất bại", type: "error" });
      setLoadding(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa phim này?")) return;
    try {
      await deleteMovie(id);

      // Tính toán số trang mới trước khi xóa
      const currentTotalPages = Math.ceil(listMovie.length / itemsPerPage);
      const newTotalPages = Math.ceil((listMovie.length - 1) / itemsPerPage);

      // Nếu đang ở trang cuối và sau khi xóa sẽ không còn phim ở trang đó, chuyển về trang trước
      if (
        page === currentTotalPages &&
        page > 1 &&
        newTotalPages < currentTotalPages
      ) {
        setSearchParams({ page: newTotalPages });
      }

      await handleGetList();
      setToast({ message: "Xóa phim thành công", type: "success" });
    } catch (error) {
      console.log(error);
      setToast({ message: "Xóa phim thất bại", type: "error" });
    }
  };

  const handleUpdate = (id) => {
    _setSelectedId(id);
    const item = listMovie.find((c) => c.id === id);
    if (!item) return;
    setIsModalOpen(true);
    setIsUpdate(true);
    setMovie(item);
  };

  return (
    <>
      <div className="text-white">
        {/* Header with Add Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Quản lý danh sách phim</h2>
          <button
            onClick={() => {
              setIsModalOpen(true), setIsUpdate(false);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
          >
            <svg
              className="w-5 h-5"
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
            Thêm phim mới
          </button>
        </div>

        {/* Table */}
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Tên phim
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Thể loại
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Poster
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Quốc gia
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Video
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Thời gian tạo
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {/* ⏳ ĐANG TẢI */}
                {isLoadingMovie && (
                  <tr>
                    <td colSpan={7} className="px-6 py-6 text-center">
                      <img src={ico_loadding} className="w-6 mx-auto" />
                      <p className="mt-2 text-gray-400">Đang tải dữ liệu...</p>
                    </td>
                  </tr>
                )}

                {/* ❌ KHÔNG CÓ DỮ LIỆU */}
                {!isLoadingMovie && listMovie.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-4 text-center text-gray-400"
                    >
                      Không có phim nào trong danh sách
                    </td>
                  </tr>
                )}

                {/* ✅ CÓ DỮ LIỆU */}
                {!isLoadingMovie &&
                  moviesPage.length > 0 &&
                  moviesPage.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-700/50 transition"
                    >
                      <td className="px-6 py-4 text-white">{item.name}</td>
                      <td className="px-6 py-4 text-white">
                        {item.categories}
                      </td>
                      <td className="px-6 py-4 text-white">
                        <img className="w-30" src={item.poster} alt="poster" />
                      </td>
                      <td className="px-6 py-4 text-white">{item.country}</td>
                      <td className="px-6 py-4">
                        <div className="w-80 h-40 rounded-xl overflow-hidden border border-gray-700 shadow-md mx-auto">
                          <iframe
                            src={item.url} // link /preview
                            className="w-full h-full"
                            allow="autoplay"
                            loading="lazy"
                          ></iframe>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {item.createdAt?.seconds
                          ? new Date(
                              item.createdAt.seconds * 1000
                            ).toLocaleString("vi-VN")
                          : "—"}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleUpdate(item.id)}
                          className="text-blue-400 hover:underline mr-3 cursor-pointer"
                        >
                          Sửa
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-400 hover:underline cursor-pointer"
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {!isLoadingMovie && listMovie.length > 0 && totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2">
            {/* Nút Previous */}
            <button
              onClick={() => handleChangePage(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-600 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
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
              Trước
            </button>

            {/* Số trang */}
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => {
                  // Hiển thị tất cả trang nếu <= 7 trang
                  // Nếu nhiều hơn, chỉ hiển thị trang đầu, cuối, và các trang xung quanh trang hiện tại
                  if (
                    totalPages <= 7 ||
                    pageNum === 1 ||
                    pageNum === totalPages ||
                    (pageNum >= page - 1 && pageNum <= page + 1)
                  ) {
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handleChangePage(pageNum)}
                        className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                          pageNum === page
                            ? "bg-red-600 text-white font-semibold"
                            : "bg-gray-700 hover:bg-gray-600 text-white"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  } else if (pageNum === page - 2 || pageNum === page + 2) {
                    return (
                      <span key={pageNum} className="px-2 text-gray-400">
                        ...
                      </span>
                    );
                  }
                  return null;
                }
              )}
            </div>

            {/* Nút Next */}
            <button
              onClick={() => handleChangePage(page + 1)}
              disabled={page === totalPages}
              className="px-4 py-2 cursor-pointer rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              Sau
              <svg
                className="w-5 h-5"
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
          </div>
        )}

        {/* Hiển thị thông tin phân trang */}
        {!isLoadingMovie && listMovie.length > 0 && (
          <div className="mt-4 text-center text-gray-400 text-sm">
            Hiển thị {startIndex + 1} - {Math.min(endIndex, listMovie.length)}{" "}
            trong tổng số {listMovie.length} phim
          </div>
        )}
      </div>

      <div>
        <AddMovie
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          _selectedId={_selectedId}
          setMovie={setMovie}
          formMovie={formMovie}
          movie={movie}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          data={data}
          loadding={loadding}
          toast={toast}
          setToast={setToast}
          isUpdate={isUpdate}
        />
      </div>
    </>
  );
};

export default Movie;
