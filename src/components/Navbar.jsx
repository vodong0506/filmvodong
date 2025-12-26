import React, { useState, useRef, useEffect } from "react";
import logo from "../assets/logo.png";
import ico_search from "../assets/ico_search.png";
import ico_notice from "../assets/ico_notice.png";
import ico_user from "../assets/ico_user.png";
import ico_admin from "../assets/ico_admin.png";
import ico_setting from "../assets/ico_setting.png";
import ico_logout from "../assets/ico_logout.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { doLogout } from "../store/features/auth";
import Toast from "./Toast";

const Navbar = () => {
  const user = useSelector((state) => state.authen.user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();

  // Đóng dropdown khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    setToast({ message: "Đăng xuất thành công", type: "success" });
    dispatch(doLogout());
  };

  return (
    <>
      <section className="fixed top-0 w-full bg-black shadow shadow-gray-500 z-100 flex items-center justify-between px-5 lg:px-20 py-5">
        <div className="flex items-center gap-20">
          <img className="w-30 lg:w-40 h-12" src={logo} alt="logo" />
          <div className="hidden lg:block">
            <ul className="text-white flex items-center gap-8">
              <Link to={"/"}>
                <li className="p-2 center_bar">Home</li>
              </Link>
              <li className="p-2 text-gray-400">Kids</li>
              <li className="p-2 text-gray-400">Movies</li>
              <li className="p-2 text-gray-400">New</li>
              <li className="p-2 text-gray-400">My List</li>
            </ul>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <img
            className="w-6 cursor-pointer hover:scale-110 transition duration-300"
            src={ico_search}
            alt="icon search"
          />
          <img
            className="w-6 cursor-pointer hover:scale-110 transition duration-300"
            src={ico_notice}
            alt="icon notice"
          />
          {!user ? (
            <img
              className="w-6 cursor-pointer hover:scale-110 transition duration-300"
              src={ico_user}
              alt="icon user"
            />
          ) : (
            <div className="relative" ref={dropdownRef}>
              <div
                className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition duration-300 py-2"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <p className="text-white font-bold">
                  {user.name.length > 10
                    ? user.name.slice(0, 10) + "..."
                    : user.name}
                </p>
                <svg
                  className={`w-4 h-4 text-white transition-transform duration-300 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-2 z-50">
                  <Link
                    to="/profile"
                    className="px-4 py-2 text-white hover:bg-gray-700 transition duration-200 flex items-center gap-5"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <img className="w-5" src={ico_user} alt="icon user" />
                    <p>Profile</p>
                  </Link>
                  <Link
                    to="/admin"
                    className={`px-4 py-2 text-white hover:bg-gray-700 transition duration-200 flex items-center gap-5 ${
                      user.rule === "admin" ? "block" : "hidden"
                    }`}
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <img className="w-5" src={ico_admin} alt="icon admin" />
                    <p>Admin</p>
                  </Link>
                  <Link
                    to="/setting"
                    className="px-4 py-2 text-white hover:bg-gray-700 transition duration-200 flex items-center gap-5"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <img className="w-5" src={ico_setting} alt="icon setting" />
                    <p>Setting</p>
                  </Link>
                  <Link
                    to="/"
                    className="px-4 py-2 text-white hover:bg-gray-700 transition duration-200 flex items-center gap-5"
                    onClick={() => handleLogout()}
                  >
                    <img className="w-5" src={ico_logout} alt="icon logout" />
                    <p>Logout</p>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </section>
    </>
  );
};

export default Navbar;
