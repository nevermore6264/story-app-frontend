// app/login/page.js
"use client";

import { useRouter } from "next/navigation"; // Correct import for app directory
import axios from "axios";
import Footer from "../components/Footer"; // Import the Footer component
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

export default function Login() {
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Perform login API call
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        {
          email: e.target.email.value,
          password: e.target.password.value,
        }
      );

      const token = response.data.token;

      // Store token in cookies
      document.cookie = `token=${token}; path=/;`;

      // Redirect to home page after login
      router.push("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="flex-grow-1 d-flex align-items-center justify-content-center">
        <div className="container d-flex flex-column align-items-center justify-content-center">
          <h1 className="mb-4">Đăng nhập</h1>
          <form onSubmit={handleLogin} className="w-50">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                name="email"
                type="text"
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
            <button type="submit" className="btn btn-primary w-100">
              Đăng nhập
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
