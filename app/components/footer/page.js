// components/Footer.js
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const Footer = () => {
  return (
    <footer className="bg-secondary py-3">
      <div className="container text-center">
        <p className="mb-0 text-light">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
