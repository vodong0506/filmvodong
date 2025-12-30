import React from "react";
import ico_loadding from "../../../assets/icon_loadding.gif";
import Toast from "../../../components/Toast";

const AddMovie = ({
  isModalOpen,
  setIsModalOpen,
  setMovie,
  formMovie,
  movie,
  handleSubmit,
  handleChange,
  data,
  loadding,
  toast,
  setToast,
  isUpdate,
}) => {
  return (
    <>
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
                  {isUpdate ? "Cập nhật phim" : "Thêm phim mới"}
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

                  {/* Năm phát hành */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-200">
                        Năm phát hành
                      </label>
                      <input
                        name="year"
                        value={movie.year}
                        onChange={handleChange}
                        placeholder="Nhập năm phát hành"
                        autoComplete="current-password"
                        spellCheck="false"
                        required
                        className="w-full rounded-xl bg-gray-800/60 border border-gray-700/50 px-4 py-3 text-white placeholder-gray-500 outline-none transition-all focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 focus:bg-gray-800"
                      />
                    </div>

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

                      <div className="flex items-center gap-3 mt-2">
                        <label className="block text-sm font-medium text-gray-200">
                          Hot
                        </label>
                        <input
                          type="checkbox"
                          name="hot"
                          checked={movie.hot || false}
                          onChange={(e) =>
                            setMovie({ ...movie, hot: e.target.checked })
                          }
                          className="w-4 h-4 cursor-pointer"
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

                  {/* Link main img */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-200">
                      Ảnh đại diện phim
                    </label>
                    <input
                      name="image"
                      value={movie.image}
                      onChange={handleChange}
                      placeholder="https://.."
                      autoComplete="current-password"
                      spellCheck="false"
                      required
                      className="w-full rounded-xl bg-gray-800/60 border border-gray-700/50 px-4 py-3 text-white placeholder-gray-500 outline-none transition-all focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 focus:bg-gray-800"
                    />
                  </div>

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

export default AddMovie;
