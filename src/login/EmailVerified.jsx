import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import { auth } from "../firebase";
import logo from "../assets/logo.png";

const EmailVerified = () => {
  const navigate = useNavigate();
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Reload user để cập nhật trạng thái email verified mới nhất
        await user.reload();
        setIsEmailVerified(user.emailVerified);
      } else {
        setIsEmailVerified(false);
      }
      setIsChecking(false);
    });

    // Kiểm tra lại mỗi 2 giây để cập nhật trạng thái khi user click vào link
    const interval = setInterval(async () => {
      const user = auth.currentUser;
      if (user) {
        await user.reload();
        setIsEmailVerified(user.emailVerified);
      }
    }, 2000);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, []);

  const handleResendEmail = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert("Vui lòng đăng nhập lại để gửi email xác thực");
      return;
    }

    if (user.emailVerified) {
      alert("Email đã được xác thực");
      return;
    }

    try {
      setIsSending(true);
      await sendEmailVerification(user);
      alert("Đã gửi lại email xác thực. Vui lòng kiểm tra Gmail");
    } catch (error) {
      console.error(error);
      alert("Gửi email thất bại, thử lại sau");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="relative min-h-screen bg-linear-to-br from-black via-gray-900 to-black text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(220,38,38,0.12),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(59,130,246,0.08),transparent_30%)] pointer-events-none" />

      {/* HEADER */}
      <header className="sticky top-0 z-10 bg-black/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <img className="w-28" src={logo} alt="Logo" />
            <span className="hidden text-sm text-gray-300 sm:inline">
              Xác thực email để hoàn tất đăng ký
            </span>
          </div>

          <button
            onClick={() => navigate("/login")}
            className="rounded-md bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/20 transition"
          >
            Đăng nhập
          </button>
        </div>
      </header>

      {/* MAIN */}
      <main className="mx-auto flex min-h-[calc(100vh-80px)] max-w-6xl items-center justify-center px-6">
        <div className="w-full max-w-xl rounded-2xl bg-white/5 p-8 text-center shadow-2xl backdrop-blur">
          <h1 className="mb-4 text-3xl font-bold">Đã gửi email xác thực!</h1>

          <p className="mb-2 text-gray-300">
            Chúng tôi đã gửi liên kết xác thực đến email của bạn.
          </p>

          <p className="mb-6 text-sm text-gray-400">
            Vui lòng kiểm tra Gmail (hoặc Spam) và nhấn vào liên kết để hoàn tất
            đăng ký.
          </p>

          <div className="flex items-center justify-between gap-5">
            <button
              onClick={() => navigate("/login")}
              disabled={!isEmailVerified || isChecking}
              className={`w-full rounded-lg py-3 font-semibold transition ${
                isEmailVerified && !isChecking
                  ? "bg-red-600 hover:bg-red-700 cursor-pointer"
                  : "bg-gray-600 cursor-not-allowed opacity-50"
              }`}
            >
              {isChecking
                ? "Đang kiểm tra..."
                : isEmailVerified
                ? "Tôi đã xác thực → Đăng nhập"
                : "Vui lòng xác thực email trước"}
            </button>
            <button
              onClick={handleResendEmail}
              disabled={isSending}
              className={`w-1/5 rounded-lg py-3 font-semibold transition ${
                isSending
                  ? "bg-gray-600 cursor-not-allowed opacity-50"
                  : "bg-red-800 hover:bg-red-900 cursor-pointer"
              }`}
            >
              {isSending ? "Đang gửi..." : "Gửi lại"}
            </button>
          </div>

          <p className="mt-4 text-xs text-gray-500">
            * Bạn chỉ có thể đăng nhập sau khi xác thực email thành công
          </p>
        </div>
      </main>
    </section>
  );
};

export default EmailVerified;
