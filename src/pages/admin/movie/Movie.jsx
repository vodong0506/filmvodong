import React, { useEffect, useState } from "react";
import Toast from "../../../components/Toast";
import ico_loadding from "../../../assets/icon_loadding.gif";
import useGetListCategory from "../../../hooks/useGetListCategory";
import { createMovie, deleteMovie } from "../../../service/movie-service";
import useGetListMovie from "../../../hooks/useGetListMovie";
import { useSearchParams } from "react-router-dom";

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
  };

  const { data } = useGetListCategory();
  const {
    data: listMovie,
    isLoading: isLoadingMovie,
    handleGetList,
  } = useGetListMovie();
  console.log(listMovie);

  const [movie, setMovie] = useState(formMovie);
  const [toast, setToast] = useState(null);
  const [loadding, setLoadding] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [_selectedId, _setSelectedId] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || 1);
  const itemsPerPage = 5;

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
      await createMovie(movie);
      setToast({ message: "Thêm phim thành công", type: "success" });
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

  return (
    <>
      <div className="text-white">
        {/* Header with Add Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Quản lý danh sách phim</h2>
          <button
            onClick={() => setIsModalOpen(true)}
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
                          // onClick={() => handleUpdate(item.id)}
                          className="text-blue-400 hover:underline mr-3"
                        >
                          Sửa
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-400 hover:underline"
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

      {isModalOpen && (
        <div className="fixed w-full min-h-screen inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          {/* Modal box */}
          <div className="w-full max-w-3xl max-h-[90vh] rounded-2xl bg-linear-to-br from-gray-900 to-gray-800 shadow-2xl ring-1 ring-white/20 flex flex-col animate-in fade-in zoom-in duration-200">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5 bg-linear-to-r from-gray-800/50 to-gray-900/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-600/20 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-white">
                  {_selectedId ? "Cập nhật phim" : "Thêm phim mới"}
                </h2>
              </div>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setMovie(formMovie);
                }}
                className="w-8 h-8 rounded-lg bg-gray-700/50 hover:bg-gray-600 text-gray-300 hover:text-white transition-all flex items-center justify-center cursor-pointer"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="overflow-y-auto flex-1 px-6 py-6">
              <form className="space-y-5" onSubmit={handleSubmit}>
                {/* Section 1: Thông tin cơ bản */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    Thông tin cơ bản
                  </h3>

                  {/* Tên phim */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-200">
                      Tên phim <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="name"
                      value={movie.name}
                      onChange={handleChange}
                      placeholder="Nhập tên phim"
                      autoComplete="current-password"
                      spellCheck="false"
                      required
                      className="w-full rounded-xl bg-gray-800/60 border border-gray-700/50 px-4 py-3 text-white placeholder-gray-500 outline-none transition-all focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 focus:bg-gray-800"
                    />
                  </div>

                  {/* Đạo diễn */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-200">
                      Đạo diễn
                    </label>
                    <input
                      name="director"
                      value={movie.director}
                      onChange={handleChange}
                      placeholder="Nhập tên đạo diễn"
                      autoComplete="current-password"
                      spellCheck="false"
                      required
                      className="w-full rounded-xl bg-gray-800/60 border border-gray-700/50 px-4 py-3 text-white placeholder-gray-500 outline-none transition-all focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 focus:bg-gray-800"
                    />
                  </div>
                </div>

                {/* Section 2: Diễn viên & Thể loại */}
                <div className="space-y-4 pt-2">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    Diễn viên & Thể loại
                  </h3>

                  {/* Diễn viên */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-200">
                      Diễn viên
                    </label>
                    <input
                      name="cast"
                      value={movie.cast}
                      onChange={handleChange}
                      placeholder="Ví dụ: Diễn viên 1, Diễn viên 2, Diễn viên 3"
                      autoComplete="current-password"
                      spellCheck="false"
                      required
                      className="w-full rounded-xl bg-gray-800/60 border border-gray-700/50 px-4 py-3 text-white placeholder-gray-500 outline-none transition-all focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 focus:bg-gray-800"
                    />
                    <p className="mt-1.5 text-xs text-gray-500">
                      Cách nhau bằng dấu phẩy
                    </p>
                  </div>

                  {/* Thể loại */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-200">
                      Thể loại <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="categories"
                      value={movie.categories}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl bg-gray-800/60 border border-gray-700/50 px-4 py-3 text-white outline-none transition-all focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 focus:bg-gray-800 appearance-none cursor-pointer"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23ffffff' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 1rem center",
                        paddingRight: "2.5rem",
                      }}
                    >
                      <option
                        value="not_select"
                        className="bg-gray-800 text-gray-400"
                      >
                        Chọn thể loại
                      </option>
                      {data?.map((cate) => (
                        <option
                          key={cate.id}
                          value={cate.name} // Lưu name chứ không phải id
                          className="bg-gray-800 text-white"
                        >
                          {cate.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Section 3: Thông tin khác */}
                <div className="space-y-4 pt-2">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    Thông tin khác
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Quốc gia */}
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-200">
                        Quốc gia
                      </label>
                      <input
                        name="country"
                        value={movie.country}
                        onChange={handleChange}
                        placeholder="Nhập quốc gia"
                        autoComplete="current-password"
                        spellCheck="false"
                        required
                        className="w-full rounded-xl bg-gray-800/60 border border-gray-700/50 px-4 py-3 text-white placeholder-gray-500 outline-none transition-all focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 focus:bg-gray-800"
                      />
                    </div>

                    {/* Ngôn ngữ */}
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-200">
                        Ngôn ngữ
                      </label>
                      <input
                        name="language"
                        value={movie.language}
                        onChange={handleChange}
                        placeholder="Nhập ngôn ngữ"
                        autoComplete="current-password"
                        spellCheck="false"
                        required
                        className="w-full rounded-xl bg-gray-800/60 border border-gray-700/50 px-4 py-3 text-white placeholder-gray-500 outline-none transition-all focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 focus:bg-gray-800"
                      />
                    </div>
                  </div>

                  {/* Thời lượng */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-200">
                      Thời lượng
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <input
                          type="number"
                          placeholder="Giờ"
                          value={movie.hour}
                          onChange={(e) =>
                            setMovie({ ...movie, hour: e.target.value })
                          }
                          min="0"
                          autoComplete="current-password"
                          spellCheck="false"
                          required
                          className="w-full rounded-xl bg-gray-800/60 border border-gray-700/50 px-4 py-3 text-white placeholder-gray-500 outline-none transition-all focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 focus:bg-gray-800"
                        />
                      </div>
                      <div>
                        <input
                          type="number"
                          placeholder="Phút"
                          value={movie.minute}
                          onChange={(e) =>
                            setMovie({ ...movie, minute: e.target.value })
                          }
                          min="0"
                          max="59"
                          autoComplete="current-password"
                          spellCheck="false"
                          required
                          className="w-full rounded-xl bg-gray-800/60 border border-gray-700/50 px-4 py-3 text-white placeholder-gray-500 outline-none transition-all focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 focus:bg-gray-800"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 4: Media */}
                <div className="space-y-4 pt-2">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    Media
                  </h3>

                  {/* Link video Google Drive */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-200">
                      Link video (Google Drive)
                    </label>
                    <input
                      name="url"
                      value={movie.url}
                      onChange={handleChange}
                      placeholder="https://drive.google.com/..."
                      autoComplete="current-password"
                      spellCheck="false"
                      required
                      className="w-full rounded-xl bg-gray-800/60 border border-gray-700/50 px-4 py-3 text-white placeholder-gray-500 outline-none transition-all focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 focus:bg-gray-800"
                    />
                  </div>

                  {/* Poster */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-200">
                      Poster URL
                    </label>
                    <input
                      name="poster"
                      value={movie.poster}
                      onChange={handleChange}
                      placeholder="https://..."
                      autoComplete="current-password"
                      spellCheck="false"
                      required
                      className="w-full rounded-xl bg-gray-800/60 border border-gray-700/50 px-4 py-3 text-white placeholder-gray-500 outline-none transition-all focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 focus:bg-gray-800"
                    />
                  </div>
                </div>

                {/* Section 5: Mô tả */}
                <div className="pt-2">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    Mô tả
                  </h3>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-200">
                      Mô tả phim
                    </label>
                    <textarea
                      name="description"
                      value={movie.description}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Nhập mô tả về bộ phim..."
                      autoComplete="current-password"
                      spellCheck="false"
                      required
                      className="w-full rounded-xl bg-gray-800/60 border border-gray-700/50 px-4 py-3 text-white placeholder-gray-500 outline-none transition-all focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 focus:bg-gray-800 resize-none"
                    />
                  </div>
                </div>

                {/* Footer buttons inside form */}
                <div className="flex justify-end gap-3 pt-6 border-t border-white/10 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setMovie(formMovie);
                    }}
                    className="px-6 py-2.5 bg-gray-700/50 hover:bg-gray-600 text-gray-200 hover:text-white rounded-xl transition-all font-medium"
                  >
                    Hủy
                  </button>

                  <button
                    type="submit"
                    disabled={loadding}
                    className="px-6 py-2.5 cursor-pointer bg-linear-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900 text-white rounded-xl transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-red-500/20"
                  >
                    {loadding ? (
                      <>
                        <img
                          src={ico_loadding}
                          className="w-5 h-5"
                          alt="Loading"
                        />
                        <span>Đang xử lý...</span>
                      </>
                    ) : (
                      <>
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
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>Xác nhận</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
};

export default Movie;
