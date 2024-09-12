// app/register/page.js
"use client";

import { useRouter } from "next/navigation"; // Correct import for app directory
import axios from "axios";
import Footer from "../components/footer/page"; // Adjusted import path
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

export default function Register() {
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Perform register API call
    try {
      await axios.post("http://localhost:4000/api/auth/signup", {
        username: e.target.username.value,
        email: e.target.email.value,
        password: password,
      });

      // Redirect to login page after successful registration
      router.push("/login");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="flex-grow-1 d-flex align-items-center justify-content-center">
        <div className="container d-flex flex-column align-items-center justify-content-center">
          {/* Logo added before register title */}
          <img
            src="/img/logo.png"
            alt="Logo"
            width="120"
            height="120"
            className="mb-4" // Add some margin-bottom to create space below the logo
          />
          <h1 className="mb-4">Đăng ký</h1>
          <form onSubmit={handleRegister} className="w-50">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Tên
              </label>
              <input
                name="username"
                type="text"
                id="username"
                placeholder="Vui lòng nhập tên"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                name="email"
                type="email"
                id="email"
                placeholder="Vui lòng nhập email"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Mật khẩu
              </label>
              <input
                name="password"
                type="password"
                id="password"
                placeholder="Vui lòng nhập mật khẩu"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Xác nhận mật khẩu
              </label>
              <input
                name="confirmPassword"
                type="password"
                id="confirmPassword"
                placeholder="Vui lòng nhập lại mật khẩu"
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Đăng ký
            </button>
          </form>
          <p className="mt-3">
            Đã có tài khoản?
            <a href="/login" className="text-primary">
              Đăng nhập
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
