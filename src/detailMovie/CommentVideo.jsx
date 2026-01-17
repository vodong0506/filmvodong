import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useSearchParams, Link } from "react-router-dom";
import useGetComments from "../hooks/useGetComments";
import { createComment, deleteComment } from "../service/comment-service";
import Toast from "../components/Toast";
import ico_loadding from "../assets/icon_loadding.gif";

const CommentVideo = ({ movieId, movieName }) => {
  const [searchParams] = useSearchParams();
  const id = movieId || searchParams.get("id");
  const user = useSelector((state) => state.authen.user);
  const { data: comments, isLoading, refresh } = useGetComments(id);
  console.log(comments);
  const [commentText, setCommentText] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Update userName and userEmail when user changes
  useEffect(() => {
    if (user) {
      setUserName(user.name || "");
      setUserEmail(user.email || "");
    }
  }, [user]);

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

    // Format as DD/MM/YYYY HH:mm
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    if (!commentText.trim()) {
      setToast({
        message: "Vui lòng nhập nội dung bình luận",
        type: "warning",
      });
      return;
    }

    if (!userName.trim()) {
      setToast({
        message: "Vui lòng nhập tên của bạn",
        type: "warning",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await createComment({
        movieId: id,
        movieName: movieName || "",
        userId: user?.uid || "anonymous",
        userName: userName.trim(),
        userEmail: userEmail.trim() || user?.email || "",
        content: commentText.trim(),
      });

      setCommentText("");
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
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
      <div className="space-y-6 w-full">
        {/* Comment Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-white flex items-center gap-2">
            <svg
              className="w-6 h-6"
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
            Bình luận ({comments.length})
          </h3>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="bg-green-500/20 border border-green-500 rounded-lg p-4 mb-4">
            <p className="text-green-400 font-semibold text-xs">
              Cảm ơn bạn! Bình luận đã được gửi.
            </p>
          </div>
        )}

        {/* Comment Form */}
        <div className="bg-[rgb(15,15,13)]">
          <form onSubmit={handleSubmitComment}>
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Viết bình luận của bạn..."
              maxLength={1000}
              className="w-full bg-[rgb(19,19,14)] text-white text-sm rounded-lg px-4 py-3 border border-gray-700 focus:outline-none resize-none min-h-30 placeholder-gray-400"
              disabled={isSubmitting}
            />
            <div className="flex justify-end mt-2">
              <span className="text-gray-500 text-xs">
                {commentText.length}/1000
              </span>
            </div>

            <div className="flex items-center justify-end mt-4">
              <button
                type="submit"
                disabled={
                  isSubmitting || !commentText.trim() || !userName.trim()
                }
                className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black text-sm font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <img src={ico_loadding} alt="Loading" className="w-4 h-4" />
                    <span>Đang gửi...</span>
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                    <span>Gửi</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Comments List */}
        <div className="">
          {comments.length === 0 ? (
            <div className="text-center">
              <svg
                className="w-10 h-10 mx-auto text-gray-500 mb-4"
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
              <p className="text-gray-400 text-sm">
                Chưa có bình luận nào. Hãy là người đầu tiên bình luận!
              </p>
            </div>
          ) : (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-[rgb(14,14,12)] rounded-lg p-5 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center shrink-0">
                    <span className="text-white font-bold">
                      {comment.userName?.charAt(0)?.toUpperCase() || "U"}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-3">
                        <h4 className="text-white font-semibold mb-1 text-sm">
                          {comment.userName}
                        </h4>
                        <div className="flex items-center gap-2 text-gray-500 text-xs">
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
                    <p className="text-gray-300 mb-3 whitespace-pre-wrap wrap-break-word text-sm">
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
