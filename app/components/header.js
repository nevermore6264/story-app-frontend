import Link from 'next/link';
import styles from './header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className="container mx-auto px-4 flex justify-between items-center py-4">
        <Link href="/" className={styles.logo}>Trang Chủ</Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/" className={styles.navLink}>Danh sách Truyện</Link></li>
            <li><Link href="/login" className={styles.navLink}>Đăng Nhập</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
