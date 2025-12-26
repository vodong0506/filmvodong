import React, { useState } from "react";
import Toast from "../../../components/Toast";
import ico_loadding from "../../../assets/icon_loadding.gif";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "../../../service/category-service";
import useGetListCategory from "../../../hooks/useGetListCategory";
const Category = () => {
  const [toast, setToast] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [loadding, setLoadding] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const {
    data: listCategory,
    isLoading: isLoadingCategory,
    handleGetList,
  } = useGetListCategory();

  console.log(listCategory);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadding(true);
    try {
      if (selectedId) {
        await updateCategory(selectedId, categoryName);
        setToast({ message: "Cập nhật thể loại thành công", type: "success" });
      } else {
        await createCategory(categoryName);
        setToast({ message: "Thêm thể loại thành công", type: "success" });
      }
      await handleGetList(); // 👈 SWR reload
      setLoadding(false);
      setIsModalOpen(false);
      setCategoryName("");
    } catch (error) {
      console.error(error);
      setToast({ message: "Thêm thể loại thất bại", type: "error" });
    } finally {
      setLoadding(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa thể loại này?")) return;

    try {
      await deleteCategory(id);
      await handleGetList(); // 👈 reload
      setToast({ message: "Xóa thể loại thành công", type: "success" });
    } catch (error) {
      console.error(error);
      setToast({ message: "Xóa thất bại", type: "error" });
    }
  };

  const handleUpdate = (id) => {
    setSelectedId(id);
    const item = listCategory.find((c) => c.id === id);
    if (!item) return;

    setCategoryName(item.name);
    setIsUpdate(true);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="text-white">
        {/* Header with Add Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Quản lý thể loại</h2>
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
            Thêm thể loại
          </button>
        </div>

        {/* Table */}
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Tên thể loại
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Thời gian tạo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Thời gian cập nhật
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {/* ⏳ ĐANG TẢI */}
                {isLoadingCategory && (
                  <tr>
                    <td colSpan={4} className="px-6 py-6 text-center">
                      <img src={ico_loadding} className="w-6 mx-auto" />
                      <p className="mt-2 text-gray-400">Đang tải dữ liệu...</p>
                    </td>
                  </tr>
                )}

                {/* ❌ KHÔNG CÓ DỮ LIỆU */}
                {!isLoadingCategory && listCategory.length === 0 && (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-6 py-4 text-center text-gray-400"
                    >
                      Không có thể loại nào
                    </td>
                  </tr>
                )}

                {/* ✅ CÓ DỮ LIỆU */}
                {!isLoadingCategory &&
                  listCategory.length > 0 &&
                  listCategory.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-700/50 transition"
                    >
                      <td className="px-6 py-4 text-white">{item.name}</td>
                      <td className="px-6 py-4 text-gray-300">
                        {item.createdAt?.seconds
                          ? new Date(
                              item.createdAt.seconds * 1000
                            ).toLocaleString("vi-VN")
                          : "—"}
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {item.updatedAt?.seconds
                          ? new Date(
                              item.createdAt.seconds * 1000
                            ).toLocaleString("vi-VN")
                          : "—"}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleUpdate(item.id)}
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
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
          {/* Modal box */}
          <div className="w-full max-w-md rounded-2xl bg-gray-900 shadow-2xl ring-1 ring-white/10">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">
                {isUpdate ? "Cập nhật thể loại" : "Thêm thể loại mới"}
              </h2>
              <button
                onClick={() => {
                  setIsModalOpen(false), setCategoryName("");
                }}
                className="text-gray-400 hover:text-white transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">
                  Tên thể loại
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Hành động"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  autoComplete="current-password"
                  spellCheck="false"
                  required
                  className="w-full rounded-lg bg-black/40 px-4 py-2.5 text-white placeholder-gray-400 outline-none ring-1 ring-white/10 focus:ring-red-500"
                />
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false), setCategoryName("");
                  }}
                  className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition cursor-pointer"
                >
                  Hủy
                </button>

                <button
                  type="submit"
                  disabled={loadding}
                  className={`px-5 py-2 rounded-lg font-semibold transition flex items-center justify-center text-white cursor-pointer ${
                    loadding
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-red-700 hover:bg-red-800"
                  }`}
                >
                  {loadding ? (
                    <img src={ico_loadding} className="w-5" />
                  ) : (
                    "Xác nhận"
                  )}
                </button>
              </div>
            </form>
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

export default Category;
