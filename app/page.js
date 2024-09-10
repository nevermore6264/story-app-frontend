"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Header from "./components/header";
import Footer from "./components/footer";
import styles from "./page.module.css";

export default function Home() {
  const [stories, setStories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check if code is running on the client
      const token = Cookies.get("token");

      if (!token) {
        router.push("/login");
      } else {
        axios
          .get("http://localhost:4000/api/story", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setStories(response.data);
          })
          .catch((error) => {
            console.error("Error fetching stories:", error);
          });
      }
    }
  }, [router]);

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
            Danh sách truyện
          </h1>
          <div className="space-y-4">
            {stories.map((story) => (
              <div key={story.id} className={styles.storyItem}>
                <h2 className={styles.storyTitle}>{story.title}</h2>
                <p className={styles.storyContent}>{story.content}</p>
                <a href={`/story/${story.id}`} className={styles.readMore}>
                  Đọc thêm
                </a>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
