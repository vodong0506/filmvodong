import React, { useState } from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import ico_loadding from "../assets/icon_loadding.gif";
import ico_eye from "../assets/ico_eye.png";
import Toast from "../components/Toast";
import { useDispatch } from "react-redux";
import { doLogin } from "../store/features/auth";
import { doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

const Login = () => {
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loadding, setLoadding] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formLogin;
    setLoadding(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);
      const user = userCredential.user;

      if (!user.emailVerified) {
        alert("Vui lòng xác thực email trước khi đăng nhập");
        navigate("/emailverified");
        await auth.signOut();
        return;
      }

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data(); // Lấy tất cả các trường
        dispatch(
          doLogin({
            ...userData,
            createdAt: userData.createdAt.toDate().toISOString(),
          })
        ); // Lưu vào Redux store
      } else {
        console.error("User không tồn tại trong Firestore");
      }

      setToast({ message: "Đăng nhập thành công", type: "success" });
      setTimeout(() => {
        setLoadding(false);
        console.log("Đăng nhập thành công");
        navigate("/");
      }, 1500);
    } catch (error) {
      console.error("Lỗi đăng nhập:", error.message);
      setToast({ message: "Đăng nhập không thành công", type: "error" });
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
              Đăng nhập để tiếp tục hành trình giải trí
            </span>
          </div>
          <button
            onClick={() => navigate("/register")}
            className="rounded-md bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20 cursor-pointer"
          >
            Đăng ký
          </button>
        </div>
      </header>

      <main className="relative mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-6xl flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-xl rounded-2xl bg-white/5 p-8 shadow-2xl shadow-red-900/20 backdrop-blur">
          <div className="mb-8 space-y-2 text-center">
            <h1 className="text-3xl font-bold sm:text-4xl">
              Chào mừng trở lại
            </h1>
            <p className="text-gray-300">
              Đăng nhập để thưởng thức những bom tấn ngay lập tức.
            </p>
          </div>

          <form className="space-y-2" onSubmit={handleSubmit}>
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
                value={formLogin.email}
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
                value={formLogin.password}
                onChange={handleChange}
                className="w-full rounded-xl bg-black/50 px-4 py-4 text-white placeholder-white/50 shadow-inner outline-none ring-2 ring-transparent transition focus:ring-red-500/60"
                autoComplete="current-password"
                spellCheck="false"
                required
              />
              <img
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-10 right-3 w-5 cursor-pointer"
                src={ico_eye}
                alt="icon eye"
              />
            </div>

            <div className="flex items-center justify-end text-sm text-gray-300">
              <button
                onClick={() => navigate("/refectpassword")}
                type="button"
                className="text-red-400 hover:text-red-300 cursor-pointer"
              >
                Quên mật khẩu?
              </button>
            </div>

            <button
              type="submit"
              className={`w-full shadow-red-500 duration-300 cursor-pointer rounded-xl px-4 py-3 h-12 flex items-center justify-center text-lg font-semibold text-white transition focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-red-500 ${
                loadding
                  ? "bg-white hover:bg-white"
                  : "bg-red-600 hover:bg-red-700"
              } `}
            >
              {loadding ? (
                <img className="w-5" src={ico_loadding} alt="loadding gif" />
              ) : (
                "Đăng Nhập"
              )}
            </button>
          </form>

          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-300">
            <span>Chưa có tài khoản?</span>
            <button
              onClick={() => navigate("/register")}
              className="font-semibold cursor-pointer text-white hover:text-red-300"
            >
              Tạo ngay
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

export default Login;
