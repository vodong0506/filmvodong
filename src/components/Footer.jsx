import React from "react";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400">
      {/* TOP */}
      <div className="w-full h-[0.5px] bg-gray-500"></div>
      <div className="max-w-7xl mx-auto px-10 py-14 grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* LOGO + COMPANY */}
        <div className="col-span-2">
          <p className="text-white font-semibold mb-4">
            Công ty Cổ phần Võ Đông
          </p>

          <img className="w-30 lg:w-40 h-12" src={logo} alt="logo" />

          <div className="flex gap-4 mt-4">
            <div className="border border-gray-600 px-3 py-1 text-xs rounded">
              DMCA PROTECTED
            </div>
            <div className="border border-gray-600 px-3 py-1 text-xs rounded">
              ĐÃ THÔNG BÁO
            </div>
          </div>
        </div>

        {/* ABOUT */}
        <div>
          <h4 className="text-white font-semibold mb-4">Về VoDong</h4>
          <ul className="space-y-2 text-sm">
            <li>Giới thiệu</li>
            <li>Các gói dịch vụ</li>
            <li>Trung tâm hỗ trợ</li>
            <li>Thông tin</li>
          </ul>
        </div>

        {/* SERVICE */}
        <div>
          <h4 className="text-white font-semibold mb-4">Dịch vụ</h4>
          <ul className="space-y-2 text-sm">
            <li>Quảng cáo</li>
            <li>Mua gói</li>
            <li>Bảo hành</li>
          </ul>
        </div>

        {/* POLICY */}
        <div>
          <h4 className="text-white font-semibold mb-4">Quy định</h4>
          <ul className="space-y-2 text-sm">
            <li>Điều khoản sử dụng</li>
            <li>Chính sách thanh toán</li>
            <li>Chính sách bảo mật</li>
            <li>Cam kết quyền riêng tư</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="text-white font-semibold mb-4">Thông tin</h4>
          <ul className="space-y-2 text-sm">
            <li>Liên hệ</li>
            <li>Hotline: 0345370754</li>
            <li>Email: vodong@gmail.com</li>
          </ul>

          <div className="flex gap-4 mt-4 text-white">
            <span className="cursor-pointer">🌐</span>
            <span className="cursor-pointer">▶</span>
          </div>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="border-t border-gray-800"></div>

      {/* BOTTOM */}
      <div className="max-w-7xl mx-auto px-10 py-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
        <div className="md:col-span-2 space-y-1">
          <p>Người đại diện: Ông Võ Thành Đông</p>
          <p>Trụ sở: Bí mật</p>
          <p>Có chứng nhận kinh doanh</p>
          <p>Giấy phép cung cấp dịch vụ mua bán</p>
        </div>

        {/* APP */}
        <div className="flex md:justify-end gap-4 items-start">
          <img
            src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
            alt="App Store"
            className="h-10"
          />
          <img
            src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
            alt="Google Play"
            className="h-10"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
