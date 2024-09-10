import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-primary text-white p-4">
      <div className="container d-flex justify-content-between align-items-center">
        <Link href="/" className="text-white fs-4 text-decoration-none">
          <img
            src="../../img/logo.png"
            alt="Logo"
            width="30"
            height="30"
            className="me-2"
          />
          Trang Chủ
        </Link>
        <Link href="/login" className="btn btn-outline-light">
          Đăng Nhập
        </Link>
      </div>
    </header>
  );
}
