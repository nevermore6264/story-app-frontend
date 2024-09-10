import styles from './footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container mx-auto px-4 py-4 text-center">
        <p className="text-gray-600">© {new Date().getFullYear()} All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
