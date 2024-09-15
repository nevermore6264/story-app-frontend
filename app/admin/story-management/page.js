"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import styles from "./storyManagement.module.css";

export default function StoryManagement() {
  const [stories, setStories] = useState([]);
  const [newStory, setNewStory] = useState({ title: "", content: "" });
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    const role = Cookies.get("role");

    if (!token || role !== "Admin") {
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
  }, [router]);

  const handleCreateStory = () => {
    const token = Cookies.get("token");

    if (newStory.title && newStory.content) {
      axios
        .post(
          "http://localhost:4000/api/story",
          { title: newStory.title, content: newStory.content },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          setStories([...stories, response.data]);
          setNewStory({ title: "", content: "" });
        })
        .catch((error) => {
          console.error("Error creating story:", error);
        });
    }
  };

  const handleDeleteStory = (storyId) => {
    const token = Cookies.get("token");

    axios
      .delete(`http://localhost:4000/api/story/${storyId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setStories(stories.filter((story) => story.id !== storyId));
      })
      .catch((error) => {
        console.error("Error deleting story:", error);
      });
  };

  return (
    <div className={styles.page}>
      <h1 className="text-3xl font-bold mb-4">Quản lý truyện</h1>

      <div className={styles.newStoryForm}>
        <h2>Tạo truyện mới</h2>
        <input
          type="text"
          placeholder="Tiêu đề truyện"
          value={newStory.title}
          onChange={(e) => setNewStory({ ...newStory, title: e.target.value })}
          className="form-control mb-3"
        />
        <textarea
          placeholder="Nội dung truyện"
          value={newStory.content}
          onChange={(e) =>
            setNewStory({ ...newStory, content: e.target.value })
          }
          className="form-control mb-3"
        ></textarea>
        <button onClick={handleCreateStory} className="btn btn-success">
          Tạo truyện
        </button>
      </div>

      <div className={styles.storyList}>
        <h2>Danh sách truyện</h2>
        {stories.map((story) => (
          <div key={story.id} className={styles.storyItem}>
            <h3>{story.title}</h3>
            <p>{story.content}</p>
            <button
              onClick={() => handleDeleteStory(story.id)}
              className="btn btn-danger"
            >
              Xóa truyện
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
