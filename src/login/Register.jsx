import React, { useState } from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import ico_eye from "../assets/ico_eye.png";
import ico_loadding from "../assets/icon_loadding.gif";
import Toast from "../components/Toast";
import { Link } from "react-router-dom";

const Register = () => {
  const [formRegister, setFormRegister] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loadding, setLoadding] = useState(false);
  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormRegister((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formRegister;

    if (password !== confirmPassword) {
      alert("Mật khẩu xác nhận không khớp");
      return;
    }
    setLoadding(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email,
        name,
        vip: false,
        rule: "user",
        createdAt: new Date(),
      });

      await sendEmailVerification(user);
      console.log(user.emailVerified);
      setToast({ message: "Đăng kí thành công", type: "success" });

      setTimeout(() => {
        setLoadding(false);
        navigate("/emailverified");
      }, 2000);
    } catch (error) {
      console.log("Danh ki khong thanh cong");
      console.error("Lỗi đăng ký:", error.message);
      setToast({ message: "Đăng kí không thành công", type: "error" });
      setLoadding(false);
    }
  };

  return (
    <section className="relative min-h-screen bg-linear-to-br from-black via-gray-900 to-black text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(220,38,38,0.12),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(59,130,246,0.08),transparent_30%)] pointer-events-none" />

      <header className="sticky top-0 z-10 bg-transparent backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Link to="/">
              <img
                className="w-30 h-12 md:w-40 cursor-pointer"
                src={logo}
                alt="Logo"
              />
            </Link>
            <span className="hidden text-sm font-medium text-gray-300 sm:inline">
              Tạo tài khoản để bắt đầu hành trình giải trí
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
          <div className="mb-8 space-y-2 text-center">
            <h1 className="text-3xl font-bold sm:text-4xl">
              Tạo tài khoản mới
            </h1>
            <p className="text-gray-300">
              Chỉ vài bước nữa là bạn có thể thưởng thức kho phim khổng lồ.
            </p>
          </div>

          <form className="space-y-2" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label
                className="text-sm font-medium text-gray-200"
                htmlFor="fullName"
              >
                Họ và tên
              </label>
              <input
                type="text"
                name="name"
                value={formRegister.name}
                onChange={handleChange}
                placeholder="vd: Nguyễn Văn A"
                className="w-full rounded-xl bg-black/50 px-4 py-4 text-white placeholder-white/50 shadow-inner outline-none ring-2 ring-transparent transition focus:ring-red-500/60"
                autoComplete="name"
                spellCheck="false"
                required
              />
            </div>

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
                value={formRegister.email}
                onChange={handleChange}
                placeholder="vd: name@example.com"
                className="w-full rounded-xl bg-black/50 px-4 py-4 text-white placeholder-white/50 shadow-inner outline-none ring-2 ring-transparent transition focus:ring-red-500/60"
                autoComplete="email"
                spellCheck="false"
                required
              />
            </div>

            <div className="space-y-2 relative">
              <label
                className="text-sm font-medium text-gray-200"
                htmlFor="password"
              >
                Mật khẩu
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formRegister.password}
                onChange={handleChange}
                className="w-full rounded-xl bg-black/50 px-4 py-4 text-white placeholder-white/50 shadow-inner outline-none ring-2 ring-transparent transition focus:ring-red-500/60"
                autoComplete="new-password"
                required
              />
              <img
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-10 right-3 w-5 cursor-pointer"
                src={ico_eye}
                alt="icon eye"
              />
            </div>

            <div className="space-y-2">
              <label
                className="text-sm font-medium text-gray-200"
                htmlFor="confirmPassword"
              >
                Xác nhận mật khẩu
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formRegister.confirmPassword}
                onChange={handleChange}
                className="w-full rounded-xl bg-black/50 px-4 py-4 text-white placeholder-white/50 shadow-inner outline-none ring-2 ring-transparent transition focus:ring-red-500/60"
                autoComplete="new-password"
                required
              />
            </div>

            <button
              disabled={loadding}
              type="submit"
              className={`w-full mt-5 h-12 cursor-pointer rounded-xl px-4 py-3 flex items-center justify-center text-lg font-semibold text-white transition focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-red-500 ${
                loadding
                  ? "bg-white hover:bg-white"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {loadding ? (
                <img className="w-5" src={ico_loadding} alt="loadding gif" />
              ) : (
                "Đăng ký"
              )}
            </button>
          </form>

          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-300">
            <span>Đã có tài khoản?</span>
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

export default Register;
