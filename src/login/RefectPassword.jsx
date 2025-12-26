import React, { useState } from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import ico_loadding from "../assets/icon_loadding.gif";
import Toast from "../components/Toast";

const RefectPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [loadding, setLoadding] = useState(false);
  const [toast, setToast] = useState(null);
  const [emailSent, setEmailSent] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setToast({ message: "Vui lòng nhập email", type: "error" });
      return;
    }
    setLoadding(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setToast({
        message:
          "Email đặt lại mật khẩu đã được gửi! Vui lòng kiểm tra hộp thư.",
        type: "success",
      });
      setEmailSent(true);
      setLoadding(false);
    } catch (error) {
      console.error("Lỗi gửi email đặt lại mật khẩu:", error.message);
      let errorMessage = "Không thể gửi email đặt lại mật khẩu";
      if (error.code === "auth/user-not-found") {
        errorMessage = "Email không tồn tại trong hệ thống";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Email không hợp lệ";
      } else if (error.code === "auth/too-many-requests") {
        errorMessage = "Quá nhiều yêu cầu. Vui lòng thử lại sau";
      }
      setToast({ message: errorMessage, type: "error" });
      setLoadding(false);
    }
  };

  return (
    <section className="relative min-h-screen bg-linear-to-br from-black via-gray-900 to-black text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(220,38,38,0.12),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(59,130,246,0.08),transparent_30%)] pointer-events-none" />

      <header className="sticky top-0 z-10 bg-transparent backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <img className="w-28" src={logo} alt="Logo" />
            <span className="hidden text-sm font-medium text-gray-300 sm:inline">
              Đặt lại mật khẩu để bảo vệ tài khoản của bạn
            </span>
          </div>
          <button
            onClick={() => navigate("/login")}
            className="rounded-md bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20 cursor-pointer"
          >
            Đăng nhập
          </button>
        </div>
      </header>

      <main className="relative mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-6xl flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-xl rounded-2xl bg-white/5 p-8 shadow-2xl shadow-red-900/20 backdrop-blur">
          {!emailSent ? (
            <>
              <div className="mb-8 space-y-2 text-center">
                <h1 className="text-3xl font-bold sm:text-4xl">
                  Đặt lại mật khẩu
                </h1>
                <p className="text-gray-300">
                  Nhập email của bạn để nhận liên kết đặt lại mật khẩu
                </p>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium text-gray-200"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    placeholder="vd: name@example.com"
                    className="w-full rounded-xl bg-black/50 px-4 py-3 text-white placeholder-white/50 shadow-inner outline-none ring-2 ring-transparent transition focus:ring-red-500/60"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loadding}
                  className={`w-full mt-5 cursor-pointer rounded-xl px-4 py-3 h-12 flex items-center justify-center text-lg font-semibold text-white transition focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-red-500 ${
                    loadding
                      ? "bg-white hover:bg-white"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  {loadding ? (
                    <img
                      className="w-5"
                      src={ico_loadding}
                      alt="loadding gif"
                    />
                  ) : (
                    "Gửi email đặt lại mật khẩu"
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="space-y-6 text-center">
              <div className="mb-8 space-y-2">
                <h1 className="text-3xl font-bold sm:text-4xl text-green-400">
                  Email đã được gửi!
                </h1>
                <p className="text-gray-300">
                  Chúng tôi đã gửi liên kết đặt lại mật khẩu đến email{" "}
                  <span className="font-semibold text-white">{email}</span>
                </p>
                <p className="text-sm text-gray-400 mt-4">
                  Vui lòng kiểm tra hộp thư đến (và cả thư mục spam) và làm theo
                  hướng dẫn trong email để đặt lại mật khẩu mới.
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    setEmailSent(false);
                    setEmail("");
                  }}
                  className="w-full cursor-pointer rounded-xl px-4 py-3 h-12 text-lg font-semibold text-white bg-white/10 hover:bg-white/20 transition"
                >
                  Gửi lại email
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="w-full cursor-pointer rounded-xl px-4 py-3 h-12 text-lg font-semibold text-white hover:text-red-300 transition"
                >
                  Quay lại đăng nhập
                </button>
              </div>
            </div>
          )}

          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-300">
            <span>Nhớ mật khẩu?</span>
            <button
              onClick={() => navigate("/login")}
              className="font-semibold cursor-pointer text-white hover:text-red-300"
            >
              Đăng nhập ngay
            </button>
          </div>
        </div>
      </main>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </section>
  );
};

export default RefectPassword;
