"use client";

import { useRouter } from "next/navigation"; // Correct import for app directory
import axios from "axios";
import styles from "./login.module.css"; // Assuming you create a separate CSS module

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
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h1 className={styles.heading}>Đăng nhập</h1>
        <form onSubmit={handleLogin} className={styles.form}>
          <input
            name="email"
            type="text"
            placeholder="Vui lòng nhập email"
            className={styles.input}
          />
          <input
            name="password"
            type="password"
            placeholder="Vui lòng nhập mật khẩu"
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
}
