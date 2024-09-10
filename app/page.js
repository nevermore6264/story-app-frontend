"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Header from "./components/header/page";
import Footer from "./components/footer/page";
import styles from "./page.module.css";

export default function Home() {
  const [stories, setStories] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false); // Trạng thái phát âm thanh
  const [playingStoryTitle, setPlayingStoryTitle] = useState(""); // Tiêu đề của câu chuyện đang phát
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
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

  const handleReadAloud = (storyId, storyTitle) => {
    const token = Cookies.get("token");

    if (!token) {
      router.push("/login");
    } else {
      setIsPlaying(true); // Đặt trạng thái là đang phát
      setPlayingStoryTitle(storyTitle); // Cập nhật tiêu đề câu chuyện đang phát

      axios
        .get(`http://localhost:4000/api/story/${storyId}/read-aloud`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "arraybuffer", // Ensures the response is in binary format
        })
        .then((response) => {
          // Convert response data to a Blob and create an object URL
          const audioBlob = new Blob([response.data], { type: "audio/mpeg" });
          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);

          // Check if the audio can play
          audio.oncanplaythrough = () => {
            audio.play();
            audio.onended = () => {
              setIsPlaying(false); // Đặt trạng thái là không còn phát nữa
              setPlayingStoryTitle(""); // Xóa tiêu đề câu chuyện đang phát
            };
          };

          // Handle errors in loading audio
          audio.onerror = (error) => {
            console.error("Error loading or playing audio:", error);
            setIsPlaying(false); // Đặt trạng thái là không còn phát nữa
            setPlayingStoryTitle(""); // Xóa tiêu đề câu chuyện đang phát
            alert("Không thể phát âm thanh. Vui lòng thử lại sau.");
          };
        })
        .catch((error) => {
          console.error("Error fetching story audio:", error);
          setIsPlaying(false); // Đặt trạng thái là không còn phát nữa
          setPlayingStoryTitle(""); // Xóa tiêu đề câu chuyện đang phát
          alert("Có lỗi xảy ra khi tải âm thanh.");
        });
    }
  };

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
            Danh sách truyện
          </h1>
          {isPlaying && (
            <div className={styles.notification}>
              Đang phát: {playingStoryTitle}
            </div>
          )}
          <div className="d-flex flex-wrap">
            {stories.map((story) => (
              <div key={story.id} className={styles.storyItem}>
                <h2 className={styles.storyTitle}>{story.title}</h2>
                <p className={styles.storyContent}>{story.content}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <a href={`/story/${story.id}`} className={styles.readMore}>
                    Đọc thêm
                  </a>
                  <button
                    onClick={() => handleReadAloud(story.id, story.title)}
                    className={styles.listenButton}
                  >
                    Nghe truyện
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
