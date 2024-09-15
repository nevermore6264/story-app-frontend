import localFont from "next/font/local";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import Snowflakes from "./components/snowflakes/page";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Website đọc truyện",
  description: "Website đọc truyện",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        <Snowflakes />
      </body>
    </html>
  );
}
