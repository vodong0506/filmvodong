import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams, Link } from "react-router-dom";
import useGetComments from "../hooks/useGetComments";
import { createComment, deleteComment } from "../service/comment-service";
import Toast from "../components/Toast";
import ico_user from "../assets/ico_user.png";
import ico_loadding from "../assets/icon_loadding.gif";

const CommentVideo = ({ movieId, movieName }) => {
  const [searchParams] = useSearchParams();
  const id = movieId || searchParams.get("id");
  const user = useSelector((state) => state.authen.user);
  const { data: comments, isLoading, refresh } = useGetComments(id);
  console.log(comments);
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  // Format timestamp
  const formatDate = (timestamp) => {
    if (!timestamp) return "";

    let date;
    if (timestamp?.toDate) {
      date = timestamp.toDate();
    } else if (timestamp instanceof Date) {
      date = timestamp;
    } else {
      date = new Date(timestamp);
    }

    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) {
      return "Vừa xong";
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} phút trước`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} giờ trước`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} ngày trước`;
    } else {
      return date.toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    if (!user) {
      setToast({ message: "Vui lòng đăng nhập để bình luận", type: "warning" });
      return;
    }

    if (!commentText.trim()) {
      setToast({
        message: "Vui lòng nhập nội dung bình luận",
        type: "warning",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await createComment({
        movieId: id,
        movieName: movieName || "",
        userId: user.uid,
        userName: user.name,
        userEmail: user.email,
        content: commentText.trim(),
      });

      setCommentText("");
      setToast({ message: "Bình luận thành công!", type: "success" });
      // Revalidate để fetch lại dữ liệu mới từ server
      refresh();
    } catch (error) {
      console.error("Error creating comment:", error);
      setToast({ message: "Có lỗi xảy ra, vui lòng thử lại", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <img src={ico_loadding} alt="Loading" className="w-12 h-12" />
      </div>
    );
  }

  const handleDelete = async (id) => {
    if (!id) return;
    const ok = window.confirm("Bạn có chắc muốn xóa bình luận này?");
    if (!ok) return;

    try {
      await deleteComment(id);
      // refresh lại danh sách comment
      refresh();
      setToast({
        message: "Đã xóa bình luận",
        type: "success",
      });
    } catch (error) {
      console.error("Delete comment error:", error);
      setToast({
        message: "Xóa bình luận thất bại",
        type: "error",
      });
    }
  };

  return (
    <>
      <div className="space-y-6 lg:w-1/2">
        {/* Comment Form */}
        {user ? (
          <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
            <div className="flex items-start gap-4">
              <img
                src={ico_user}
                alt="User"
                className="w-10 h-10 rounded-full object-cover shrink-0"
              />
              <div className="flex-1">
                <p className="text-white font-semibold mb-2">{user.name}</p>
                <form onSubmit={handleSubmitComment}>
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Viết bình luận của bạn..."
                    className="w-full bg-black/50 text-white rounded-lg px-4 py-3 border border-gray-700 focus:outline-none resize-none min-h-25 placeholder-gray-400"
                    disabled={isSubmitting}
                  />
                  <div className="flex justify-end mt-3">
                    <button
                      type="submit"
                      disabled={isSubmitting || !commentText.trim()}
                      className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <img
                            src={ico_loadding}
                            alt="Loading"
                            className="w-4 h-4"
                          />
                          <span>Đang gửi...</span>
                        </>
                      ) : (
                        "Gửi bình luận"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 text-center">
            <p className="text-gray-300 mb-4">Bạn cần đăng nhập để bình luận</p>
            <Link
              to="/login"
              className="inline-block px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
            >
              Đăng nhập
            </Link>
          </div>
        )}

        {/* Comments List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">
              Bình luận ({comments.length})
            </h3>
          </div>

          {comments.length === 0 ? (
            <div className="text-center py-12 bg-gray-800/30 rounded-lg border border-gray-700">
              <svg
                className="w-16 h-16 mx-auto text-gray-500 mb-4"
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
              <p className="text-gray-400 text-lg">
                Chưa có bình luận nào. Hãy là người đầu tiên bình luận!
              </p>
            </div>
          ) : (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-gray-800/50 rounded-lg p-5 border border-gray-700 hover:border-gray-600 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={ico_user}
                    alt={comment.userName}
                    className="w-10 h-10 rounded-full object-cover shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h4 className="text-white font-semibold">
                          {comment.userName}
                        </h4>
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span>{formatDate(comment.createdAt)}</span>
                        </div>
                      </div>
                      {user?.uid === comment.userId && (
                        <button
                          onClick={() => handleDelete(comment.id)}
                          className="text-gray-400 hover:text-red-500 hover:underline text-sm"
                        >
                          Xóa
                        </button>
                      )}
                    </div>
                    <p className="text-gray-300 mb-3 whitespace-pre-wrap wrap-break-word">
                      {comment.content}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

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

export default CommentVideo;
