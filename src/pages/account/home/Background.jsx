import React from "react";

const Background = ({ logo, user, navigate }) => {
  return (
    <>
      {!user && (
        <div className="fixed w-full min-h-screen top-0 z-101 overflow-hidden">
          {/* Background image với animation */}
          <div className="absolute top-0 left-0 w-full h-full">
            <img
              className="min-h-screen w-full object-cover animate-fade-in-scale"
              src="https://simplepage.vn/blog/wp-content/uploads/2022/11/netflix-octobre-contenus-2022.jpg"
              alt="Background"
            />
            {/* Overlay gradient với animation */}
            <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-black/60 via-black/50 to-black/70 animate-fade-in"></div>
          </div>

          {/* Header với logo - slide down animation */}
          <header className="absolute top-10 left-10 lg:left-30 animate-slide-down">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <img
                className="h-10 md:h-12 w-30 md:w-40 transition-transform duration-300 hover:scale-110"
                src={logo}
                alt="logo"
              />
            </div>
          </header>

          {/* Hero content với staggered animations */}
          <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center text-white">
            <div className="max-w-4xl mx-auto space-y-6 md:space-y-8 bg-black/50 p-10 rounded-2xl backdrop-blur-xs animate-fade-in-up">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in-up-delay-1">
                <span className="inline-block animate-slide-in-left">
                  Phim không giới hạn,
                </span>
                <br />
                <span className="inline-block animate-slide-in-right-delay">
                  Giải trí không ngừng
                </span>
              </h1>
              <p className="text-lg md:text-2xl text-gray-200 max-w-2xl mx-auto animate-fade-in-up-delay-2">
                Xem mọi nơi. Hủy bất cứ lúc nào.
              </p>
              <p className="text-base md:text-xl text-gray-300 max-w-xl mx-auto animate-fade-in-up-delay-3">
                Sẵn sàng xem? Nhập email để tạo hoặc kích hoạt lại tư cách thành
                viên của bạn.
              </p>

              {/* Buttons với animation */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 pt-4 animate-fade-in-up-delay-4">
                <button
                  onClick={() => navigate("/login")}
                  className="w-full sm:w-auto cursor-pointer px-8 md:px-12 py-3 md:py-4 bg-red-600 hover:bg-red-700 text-white font-semibold text-lg md:text-xl rounded-lg transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-red-600/50 active:scale-95 relative overflow-hidden group"
                >
                  <span className="relative z-10">Đăng nhập</span>
                  <span className="absolute inset-0 bg-linear-to-r from-red-700 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="w-full sm:w-auto cursor-pointer px-8 md:px-12 py-3 md:py-4 bg-white/10 hover:bg-white/20 text-white font-semibold text-lg md:text-xl rounded-lg border-2 border-white/30 hover:border-white/50 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 backdrop-blur-sm active:scale-95 relative overflow-hidden group"
                >
                  <span className="relative z-10">Đăng ký</span>
                  <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Background;
