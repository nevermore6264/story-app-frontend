// components/Header.js
import Link from "next/link";
import Image from "next/image"; // Import Image for the logo

const Header = () => {
  return (
    <header className="bg-blue-500 text-white shadow-md border-b-2 border-blue-700">
      <div className="container mx-auto px-4 flex justify-between items-center py-4">
        {/* Logo and Trang Chủ Link */}
        <div className="flex items-center space-x-2">
          <Image src="/logo.png" alt="Logo" width={40} height={40} />
          <Link href="/" className="text-xl font-bold">
            Trang Chủ
          </Link>
        </div>

        {/* Đăng Nhập Button */}
        <nav>
          <Link
            href="/login"
            className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Đăng Nhập
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
