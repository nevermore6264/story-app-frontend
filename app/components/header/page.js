"use client";

import Link from "next/link";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false); // Thêm trạng thái để kiểm tra admin

  useEffect(() => {
    const token = Cookies.get("token");
    const email = Cookies.get("email");
    const role = Cookies.get("role"); // Giả định bạn lưu role của người dùng trong cookie

    if (token && email) {
      setIsLoggedIn(true);
      setUserName(email);

      // Kiểm tra nếu role là admin
      if (role === "admin") {
        setIsAdmin(true);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("token"); // Xóa token khi đăng xuất
    Cookies.remove("email"); // Xóa email khi đăng xuất
    Cookies.remove("role"); // Xóa role khi đăng xuất
    setIsLoggedIn(false);
    window.location.href = "/login";
  };

  return (
    <header className="bg-primary text-white p-4">
      <div className="container d-flex justify-content-between align-items-center">
        <Link href="/" className="text-white fs-4 text-decoration-none">
          <img
            src="/img/logo.png"
            alt="Logo"
            width="60"
            height="60"
            className="me-2"
          />
          Trang Chủ
        </Link>

        {/* Nếu là admin, hiển thị link "Quản lý truyện" */}
        {isAdmin && (
          <Link
            href="/admin/manage-stories"
            className="text-white fs-5 text-decoration-none me-4"
          >
            Quản lý truyện
          </Link>
        )}

        <div>
          {isLoggedIn ? (
            <div className="d-flex align-items-center">
              <span className="me-3 text-white">Xin chào, {userName}</span>
              <button onClick={handleLogout} className="btn btn-outline-light">
                Đăng Xuất
              </button>
            </div>
          ) : (
            <Link href="/login" className="btn btn-outline-light">
              Đăng Nhập
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
